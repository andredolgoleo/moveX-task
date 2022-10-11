import React, { useEffect, useState } from 'react';
import './Info.scss';

import { ReactComponent as ArrowDown } from './ArrowDown.svg';
import { ReactComponent as ArrowUp } from './ArrowUp.svg';
import { ReactComponent as LaderIcon } from './LaderIcon.svg';
import { ReactComponent as ArrowLeft } from './ArrowLeft.svg';
import { ReactComponent as ArrowRight } from './ArrowRight.svg';
import { ReactComponent as CompletedIcon } from './completedIcon.svg';
import { ReactComponent as DeletingIcon } from './deletingIcon.svg';
import { ReactComponent as WritenIcon } from './writenIcon.svg';

import classname from 'classnames'

export type Data = {
  date: string;
  number: string;
  store: string;
  provider: string;
  leader: string;
  status: string;
  comment: string;
}

type Props = {
  data: Data[],
  currentPage: number,
  onPageChange: (pageNumber: number, foundedItems?: Data[]) => void,
  total: Data[],
}

export const Info: React.FC<Props> = ({
  data,
  currentPage,
  onPageChange,
  total,
}) => {
  const [succes, setSucces] = useState<number | null>(null);
  const [deleted, setDeleted] = useState<number | null>(null);
  const [wroten, setWroten] = useState<number | null>(null);

  const amountOfPages = Math.ceil(total.length / 12);

  useEffect(() => {
    if (data !== null) {
      setSucces(data?.filter(status => status.status === 'completed').length);
      setDeleted(data?.filter(status => status.status === 'deleting').length);
      setWroten(data?.filter(status => status.status === 'waiting').length);
    }
  }, [data]);

  return (
    <section className='Info'>
      <article className='Info__top-info'>
        <div className="Info__title">Проведены: <span className='succes'>{succes}шт.</span></div>
        <div className="Info__title">На удаление: <span className='deleted'>{deleted}шт.</span></div>
        <div className="Info__title">Записаны: <span className='wroten'>{wroten}шт.</span></div>
      </article>

      <div className='Info__wrapper-table'>
        <table className='Info__table table'>
          <thead className='table__header'>
            <tr>
              <label htmlFor="">
                <input type="checkbox" />
              </label>
            </tr>
            <tr>Дата и время <ArrowDown /></tr>
            <tr>Номер <ArrowDown /></tr>
            <tr>Склад <ArrowUp /></tr>
            <tr>Поставщик <ArrowDown /></tr>
            <tr>Сумма <ArrowUp /></tr>
            <tr>Ответственный <ArrowDown /></tr>
            <tr>Статус</tr>
            <tr>Комментарий</tr>
            <tr><LaderIcon /></tr>
          </thead>
          <tbody className='table__body'>
            {data.map(dataItem => (
              <tr>
                <td><label htmlFor=""><input type="checkbox" /></label></td>
                <td>{dataItem.date}</td>
                <td>{dataItem.number}</td>
                <td>{dataItem.store}</td>
                <td>{dataItem.provider}</td>
                <td>150$</td>
                <td>{dataItem.leader}</td>
                <td>{dataItem.status === 'completed'
                  ? (
                    <>
                      <span className='table__status-text'>Проведён</span>
                      <CompletedIcon />
                    </>
                  )
                  : (dataItem.status === 'deleting')
                    ? (
                      <>
                        <span className='table__status-text'>Удалить</span>
                        <DeletingIcon />
                      </>
                    )
                    : (
                      <>
                        <span className='table__status-text'>Записан</span>
                        <WritenIcon />
                      </>
                    )
                }</td>
                <td>{dataItem.comment}</td>
                <td><LaderIcon /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className='Info__footer'>
        <>
          <span
            className='Info__page-switcher'
            onClick={() => {
              onPageChange(currentPage - 1, undefined)
            }}
          >
            <span className='Info__ArrowLeft'>
              <ArrowLeft />
            </span>
            <span className='Info__prev'>Пред</span>
          </span>

          {[...Array(amountOfPages)].map((_, pageNumber) => {

            if (pageNumber === 8) {
              return (
                <>
                  <span className='Info__numberOfPage'>...</span>
                  <span onClick={(e) => {
                    onPageChange(+e.currentTarget.innerText, undefined)
                  }}
                    className={classname(
                      'Info__numberOfPage'
                    )}
                  >
                    {amountOfPages}
                  </span>
                </>
              );
            }

            if (pageNumber > 7) {
              return;
            }

            return (
              <span
                onClick={(e) => {
                  onPageChange(currentPage = +e.currentTarget.innerText)
                }}
                className={classname(
                  'Info__numberOfPage',
                  { 'Info__numberOfPage-active': currentPage === pageNumber + 1 }
                )}
              >
                {pageNumber + 1}
              </span>
            );
          })}
          <span
            className='Info__page-switcher'
            onClick={() => {
              onPageChange(currentPage + 1);
            }}
          >
            <span className='Info__next'>След</span>
            <span className='Info__ArrowRight'>
              <ArrowRight />
            </span>
          </span>
        </>
      </footer>
    </section>
  );
}