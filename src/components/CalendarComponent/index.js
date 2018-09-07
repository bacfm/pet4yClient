import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import 'moment/locale/ru';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/it';

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const WEEKDAYS_LONG = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
];
const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
export default function Calendar({onChange}){
    return (
        <DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            format="LL"
            dayPickerProps ={{
                locale: "ru",
                localeUtils: MomentLocaleUtils,
                months: MONTHS,
                weekdaysLong: WEEKDAYS_LONG,
                weekdaysShort: WEEKDAYS_SHORT,
            }}
            placeholder="Выберите дату"
            onDayChange={onChange}
        />
    );
}