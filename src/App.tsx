import React, { useState } from 'react';
import { Menu } from './components/Menu';
import { Filters } from './components/Filters';
import { Data, Info } from './components/Info';
import './App.scss';
import { getAllData } from './components/api/api';

const data = getAllData().sort(() => Math.random() - 0.5);

export const App: React.FC = () => {
  const [perPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<Data[]>(data);

  const [isVisiable, setIsVisiable] = useState(true);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage < filteredData.length
    ? currentPage * perPage
    : filteredData.length;

  const foundItems = filteredData.slice(startIndex, endIndex);

  const handleOnPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleOnVisiable = () => {
    setIsVisiable(!isVisiable);
  }

  const handleOnFilter = (data: Data[]) => {
    setCurrentPage(1);
    setFilteredData(data);
  }

  return (
    <main className='main container'>
      <section className='main__menu menu'>
        <Menu
          isVisiable={isVisiable}
          onHide={handleOnVisiable}
        />
        <Filters
          data={data}
          onFilter={handleOnFilter}
        />
      </section>

      {isVisiable && (
        <section className='main__info info'>
          <Info
            total={filteredData}
            data={foundItems}
            currentPage={currentPage}
            onPageChange={handleOnPageChange}
          />
        </section>
      )}
    </main>
  );
}
