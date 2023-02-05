import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo?: Maybe<Todo>;
  delete?: Maybe<Todo>;
  update?: Maybe<Todo>;
};


export type MutationAddTodoArgs = {
  input: TodoInput;
};


export type MutationDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateArgs = {
  input: TodoInput;
};

export type Query = {
  __typename?: 'Query';
  get: Todo;
  getAll?: Maybe<Array<Todo>>;
};


export type QueryGetArgs = {
  id: Scalars['ID'];
};

export type Todo = {
  __typename?: 'Todo';
  detail?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDone: Scalars['Boolean'];
  title: Scalars['String'];
};

export type TodoInput = {
  detail?: InputMaybe<Scalars['String']>;
  isDone: Scalars['Boolean'];
  title: Scalars['String'];
};

export type GetAllQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllQuery = { __typename?: 'Query', getAll?: Array<{ __typename?: 'Todo', id: string, title: string, detail?: string | null, isDone: boolean }> | null };


export const GetAllDocument = gql`
    query getAll {
  getAll {
    id
    title
    detail
    isDone
  }
}
    `;

/**
 * __useGetAllQuery__
 *
 * To run a query within a React component, call `useGetAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllQuery(baseOptions?: Apollo.QueryHookOptions<GetAllQuery, GetAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllQuery, GetAllQueryVariables>(GetAllDocument, options);
      }
export function useGetAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllQuery, GetAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllQuery, GetAllQueryVariables>(GetAllDocument, options);
        }
export type GetAllQueryHookResult = ReturnType<typeof useGetAllQuery>;
export type GetAllLazyQueryHookResult = ReturnType<typeof useGetAllLazyQuery>;
export type GetAllQueryResult = Apollo.QueryResult<GetAllQuery, GetAllQueryVariables>;
export const namedOperations = {
  Query: {
    getAll: 'getAll'
  }
}