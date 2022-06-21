import React from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

import './pagination.scss';

interface Props {
  handlePageChange: (page: number) => void;
  numberSearchPages: number;
  page: number;
}

const ListPagination: React.FC<Props> = (props) => {
  const onChange: PaginationProps['onChange'] = (page) => {
    props.handlePageChange(page);
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
