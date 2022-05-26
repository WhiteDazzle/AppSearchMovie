import React, { useState } from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

const ListPagination: React.FC = (props) => {
  const [current, setCurrent] = useState(3);

  const onChange: PaginationProps['onChange'] = (page) => {
    props.getPageChange(page);
    setCurrent(page);
  };

  return <Pagination size="small" current={current} onChange={onChange} total={50} />;
};

export default ListPagination;
