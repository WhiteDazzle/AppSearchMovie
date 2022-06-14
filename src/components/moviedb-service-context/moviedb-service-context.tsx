import React from 'react';

import Genre from '../../Data-types/genre';

const { Provider: GenresProvider, Consumer: GenresConsumer } = React.createContext<Genre[]>([]);

export { GenresProvider, GenresConsumer };
