import React, {Component} from 'react';
import PreviewImg from './img';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './style.css';


export default class InputForPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: this.props.get_photos,
            progress: null,
            photoError: false
        }
        this.onChange = this.onChange.bind(this)
        this.setPreview = this.setPreview.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.setLoaded = this.setLoaded.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.get_photos !== this.props.get_photos){
            this.setState({ photos: nextProps.get_photos })
        }
    }
    onDelete(id) {
        const { setPreview } = this;
        return fetch(`http://api.pet4u.com.ua/api/v1/brood/photo?whom=${this.props.whom}&id=${id}&parent_id=${this.props.parent_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': "Token " + window.localStorage.token
            }
        })
            .then((res) => res.json())
            .then(function (res) {
                if (res.photos) {
                    setPreview(res.photos)
                }
            })
            .catch((err) => console.log(err))
    }
    setPreview(urls) {
        this.setState({photos: urls});
    }
    setLoaded(num){
        this.setState({progress: num})
    }
    onChange(ev) {
        const {setPreview, setLoaded, setState} = this;
        const data = new FormData();
        let files = ev.target.files;
        if (files.length > (10 - this.state.photos.length)) {
            this.setState({ photoError: true });
            setTimeout(() => this.setState({ photoError: false }), 4000)
            let i = 1;
            while(i <= (10 - this.state.photos.length)) {
                    data.append('imageFiles', files[i]);
                    i++
            }
        } else {
            for (var img in files) {
                data.append('imageFiles', files[img]);
            }
        }
            ev.target.value = '';
        var xhr = new XMLHttpRequest();
        xhr.open('POST', `http://api.pet4u.com.ua/api/v1/brood/photo?whom=${this.props.whom}&id=${this.props.parent_id}`, true);
        xhr.setRequestHeader('Authorization', `Token ${window.localStorage.token}`);
        xhr.upload.onprogress = function(ev){
                setLoaded(Math.round((ev.loaded/ev.total)*100));
                // if(ev.loaded === ev.total){}
        }
        xhr.onreadystatechange = function() {
            if(xhr.status === 200 && xhr.readyState === 4){
                let array = JSON.parse(xhr.response);
                setLoaded(null);
                setPreview(array.photos);
            }
        }
        xhr.send(data);
            // return fetch(`http://project.netway.dp.ua:8000/api/v1/brood/photo?whom=${this.props.whom}&id=${this.props.parent_id}`, {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': "Token " + window.localStorage.token
            //     },
            //     body: data
            // })  .then(function(res){
            //     console.log(res.pending);
            //     return res;
            // })
            //     .then(res => res.json())
            //     .then(function (res) {
            //         if (res.photos) {
            //             setPreview(res.photos)
            //         }
            //     })
            //     .catch((err) => console.log(err))
    }
    render() {
            const previews = this.state.photos.map((p, idx) => (<PreviewImg onClick={this.onDelete} id={p.id} key={idx} src={`http://api.pet4u.com.ua${p.photo}`}/>));
            return (
                <div className="photo-element">
                    {this.state.photos ? previews : ''}
                    {this.state.progress ? (<CircularProgressbar percentage={this.state.progress} />) : ''}
                    <div
                        className={"add-photo-controlls" + (this.state.photos.length >= 10 ? ' disabled-input' : '')}>
                        <input type="file" onChange={this.onChange} multiple
                               disabled={this.state.photos.length >= 10 ? true : false} maxLength={10} accept=".png, .jpg, .jpeg"/>
                        <label><span>+</span>Добавить фото</label>
                    </div>
                    {this.state.photoError ? (<div className="overlay"><div className="ph-error popup"><h1><b>Максимальное количество</b> фотографий - 10</h1></div></div>) : ''}
                </div>
            );
    }
}