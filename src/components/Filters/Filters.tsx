import React, { useState } from 'react';

import './filters.scss';

import './script';

import { ReactComponent as Circle } from './circle.svg';
import { ReactComponent as CircleSelected } from './circle-selected.svg';
import { ReactComponent as Line } from './line.svg';
import { ReactComponent as SelectedLine } from './selectedLine.svg';

import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.css';

import { Data } from '../Info';

import classname from 'classnames'

type Props = {
  data: Data[],
  onFilter: (data: Data[]) => void,
}

export const Filters: React.FC<Props> = ({ data, onFilter }) => {
  const [isSelected, setIsSelected] = useState(5);
  const [activeClass, setActiveClass] = useState(false)

  const [numberOfOrded, setNumberOfOrded] = useState<string>('');
  const [provider, setProvider] = useState<string>('');
  const [storage, setStorage] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [leader, setLeader] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const rangeSelectorArr = ['За сегодня', 'За прошлую неделю', 'В прошлом месяце', 'В прошлом году', 'За всё время'];

  let filteredData = data;

  function filtration() {
    if (numberOfOrded) {
      filteredData = data.filter(item => item.number.includes(numberOfOrded))
    }

    if (provider) {
      filteredData = data.filter(item => item.provider.includes(provider))
    }

    if (storage) {
      filteredData = data.filter(item => item.store.includes(storage))
    }

    if (date) {
      filteredData = data.filter(item => item.date.includes(date))
    }

    if (status) {
      if (status.includes(
        'п'
        || 'р'
        || 'о'
        || 'в'
        || 'е'
        || 'д'
        || 'е'
        || 'ё'
        || 'н'
      )) {
        filteredData = data.filter(item => item.status.includes('completed'));
      }

      if (status.includes(
        'у'
        || 'д'
        || 'а'
        || 'л'
        || 'и'
        || 'т'
        || 'ь'
      )) {
        filteredData = data.filter(item => item.status.includes('deleting'));
      }

      if (status.includes(
        'з'
        || 'а'
        || 'п'
        || 'и'
        || 'с'
        || 'а'
        || 'н'
      )) {
        filteredData = data.filter(item => item.status.includes('waiting'));
      }
    }

    if (leader) {
      filteredData = data.filter(item => item.leader.includes(leader))
    }

    if (comment) {
      filteredData = data.filter(item => item.comment.includes(comment))
    }

    return filteredData;
  }

  console.log(date)

  return (
    <>
      <h2>Фильтры</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFilter(filtration())
        }
        }
        onReset={(e) => {
          e.preventDefault();

          onFilter(data);

          setNumberOfOrded('');
          setProvider('');
          setStorage('');
          setDate('');
          setStatus('');
          setLeader('');
          setComment('');
        }}
        action=""
      >
        <span>
          <label
            htmlFor="since"
            className='filter-date'
          >
            <DatePicker
              onChange={(e) => {
                setDate(String(e));
              }}
              id='since'
            />
          </label>
          <label htmlFor="before" className='filter-date filter-date-second'>
            <DatePicker
              onChange={(e) => {
                setDate(String(e));
              }}
              id='before'
            />
          </label>
        </span>
        <div className='date__range--wrapper'>
          <Line className='Line' />
          {rangeSelectorArr.map((_, selectorNum) => (
            <>
              <span
                className='date__range'
                onClick={() => {
                  let a = new Date();

                  if (selectorNum === 0) {
                    setDate(String(a));
                  }

                  if (selectorNum === 1) {
                    setDate(String((a.setDate(a.getDate() - 7))))
                  }

                  if (selectorNum === 2) {
                    setDate(String((a.setDate(a.getDate() - a.getMonth()))))
                  }

                  if (selectorNum === 2) {
                    setDate(String((a.setDate(a.getDate() - 365))))

                  }

                  if (selectorNum === 3) {
                    setDate('');
                  }
                  setIsSelected(selectorNum + 1);
                }}
              >
                {(isSelected === selectorNum + 1) ? <CircleSelected /> : <Circle />}
                {(isSelected === selectorNum + 1) && <SelectedLine className={classname(
                  'selectedLine',
                  { 'selectedLine-first': selectorNum === 0 },
                  { 'selectedLine-last': selectorNum === rangeSelectorArr.length - 1 },
                )} />}
              </span>
            </>
          ))}

        </div>
        <div className='range__names'>
          {rangeSelectorArr.map((item, selectorNum) => (
            <span
              onClick={() => {
                setIsSelected(selectorNum + 1);
              }}
              className={classname({ 'active': isSelected === selectorNum + 1 })}
            >
              {item}
            </span>
          ))}
        </div>

        <div className='input__wrapper'>
          <span className='first__inputs'>
            <input
              value={numberOfOrded}
              onChange={(e) => {
                setNumberOfOrded(e.currentTarget.value)
              }}
              type="text"
              placeholder='Номер заказа'
            />
            <input
              value={provider}
              onChange={(e) => {
                setProvider(e.currentTarget.value)
              }}
              type="text"
              placeholder='Поставщик'
            />
          </span>
          <div className='second__input'>
            <input
              value={provider}
              onChange={(e) => {
                setProvider(e.currentTarget.value)
              }}
              type="text"
              placeholder='Компания'
            />
          </div>
          <div className='third__inputs'>
            <input placeholder='Сумма' type="text" />
            <input type="text" placeholder='Кол-во товара' />
          </div>
          <div className='fourth__inputs'>
            <input
              value={storage}
              onChange={(e) => {
                setStorage(e.currentTarget.value)
              }}
              type="text"
              placeholder='Склад'
            />
            <input type="text" placeholder='Возвраты поставщику' />
          </div>
          <div className='fifth__inputs'>
            <input
              value={numberOfOrded}
              onChange={(e) => {
                setNumberOfOrded(e.currentTarget.value)
              }}
              type="text"
              placeholder='Номер документа'
            />
            <input
              value={status}
              onChange={(e) => {
                setStatus(e.currentTarget.value);
              }}
              type="text"
              placeholder='Статус документа'
            />
          </div>
          <div className='sixth__inputs'>
            <input
              value={leader}
              onChange={(e) => {
                setLeader(e.currentTarget.value)
              }}
              type="text"
              placeholder='Отвественный'
            />
            <label
              className={classname(
                'custom__checkbox',
                {
                  'active': activeClass,
                })}
            >
              Отклонения
              <input
                onChange={() => setActiveClass(!activeClass)}
                type="checkbox"
              />
            </label>
          </div>
          <input
            value={comment}
            onChange={(e) => {
              setComment(e.currentTarget.value)
            }}
            className='input__comment'
            type="text"
            placeholder='Комментарий'
          />
          <div className='input__buttons'>
            <button className='button  button__submit' type='submit'>Применить</button>
            <button className='button button__reset' type='reset'>Очистить</button>
            <button className='button button__save'></button>
          </div>
        </div>
      </form>
    </>
  );
}
