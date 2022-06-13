import React from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

import './pagination.css';

interface Props {
  getPageChange: (page: number) => void;
  numberSearchPages: number;
  page: number;
}

const ListPagination: React.FC<Props> = (props) => {
  const onChange: PaginationProps['onChange'] = (page) => {
    props.getPageChange(page);
  };

  return (
    <Pagination
      size="small"
      current={props.page}
      onChange={onChange}
      total={10 * props.numberSearchPages}
      pageSize={10}
    />
  );
};

export default ListPagination;
