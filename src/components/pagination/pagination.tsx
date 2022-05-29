import React, { useState } from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

interface Props {
  getPageChange: (page: number) => void;
}

const ListPagination: React.FC<Props> = (props) => {
  const [current, setCurrent] = useState(1);
  const onChange: PaginationProps['onChange'] = (page) => {
    props.getPageChange(page);
    setCurrent(page);
  };

  return <Pagination size="small" current={current} onChange={onChange} total={50} />;
};

export default ListPagination;
