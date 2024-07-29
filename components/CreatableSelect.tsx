import type { ReactElement } from 'react';

import type { GroupBase } from 'react-select';
import type {
  ComponentProps,
  UseAsyncPaginateParams,
} from 'react-select-async-paginate';
import { withAsyncPaginate } from 'react-select-async-paginate';
import type { CreatableProps } from 'react-select/creatable';
import Creatable from 'react-select/creatable';

type AsyncPaginateCreatableProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean
> = CreatableProps<OptionType, IsMulti, Group> &
  UseAsyncPaginateParams<OptionType, Group, Additional> &
  ComponentProps<OptionType, Group, IsMulti>;

type AsyncPaginateCreatableType = <
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean = false
>(
  props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>
) => ReactElement;

const CreatableAsyncPaginate = withAsyncPaginate(
  Creatable
) as AsyncPaginateCreatableType;
