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
  add?: Maybe<Todo>;
  delete?: Maybe<Todo>;
  update?: Maybe<Todo>;
};


export type MutationAddArgs = {
  input: TodoInput;
};


export type MutationDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateArgs = {
  input: UpdateInput;
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

export type UpdateInput = {
  detail?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  isDone?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type AddMutationVariables = Exact<{
  input: TodoInput;
}>;


export type AddMutation = { __typename?: 'Mutation', add?: { __typename?: 'Todo', id: string, title: string, detail?: string | null, isDone: boolean } | null };

export type DeleteMutationVariables = Exact<{
  input: Scalars['ID'];
}>;


export type DeleteMutation = { __typename?: 'Mutation', delete?: { __typename?: 'Todo', id: string } | null };

export type GetAllQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllQuery = { __typename?: 'Query', getAll?: Array<{ __typename?: 'Todo', id: string, title: string, detail?: string | null, isDone: boolean }> | null };

export type UpdateMutationVariables = Exact<{
  input: UpdateInput;
}>;


export type UpdateMutation = { __typename?: 'Mutation', update?: { __typename?: 'Todo', id: string, title: string, detail?: string | null, isDone: boolean } | null };


export const AddDocument = gql`
    mutation add($input: TodoInput!) {
  add(input: $input) {
    id
    title
    detail
    isDone
  }
}
    `;
export type AddMutationFn = Apollo.MutationFunction<AddMutation, AddMutationVariables>;

/**
 * __useAddMutation__
 *
 * To run a mutation, you first call `useAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMutation, { data, loading, error }] = useAddMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMutation(baseOptions?: Apollo.MutationHookOptions<AddMutation, AddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMutation, AddMutationVariables>(AddDocument, options);
      }
export type AddMutationHookResult = ReturnType<typeof useAddMutation>;
export type AddMutationResult = Apollo.MutationResult<AddMutation>;
export type AddMutationOptions = Apollo.BaseMutationOptions<AddMutation, AddMutationVariables>;
export const DeleteDocument = gql`
    mutation delete($input: ID!) {
  delete(id: $input) {
    id
  }
}
    `;
export type DeleteMutationFn = Apollo.MutationFunction<DeleteMutation, DeleteMutationVariables>;

/**
 * __useDeleteMutation__
 *
 * To run a mutation, you first call `useDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMutation, { data, loading, error }] = useDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMutation, DeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMutation, DeleteMutationVariables>(DeleteDocument, options);
      }
export type DeleteMutationHookResult = ReturnType<typeof useDeleteMutation>;
export type DeleteMutationResult = Apollo.MutationResult<DeleteMutation>;
export type DeleteMutationOptions = Apollo.BaseMutationOptions<DeleteMutation, DeleteMutationVariables>;
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
export const UpdateDocument = gql`
    mutation update($input: UpdateInput!) {
  update(input: $input) {
    id
    title
    detail
    isDone
  }
}
    `;
export type UpdateMutationFn = Apollo.MutationFunction<UpdateMutation, UpdateMutationVariables>;

/**
 * __useUpdateMutation__
 *
 * To run a mutation, you first call `useUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMutation, { data, loading, error }] = useUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMutation, UpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMutation, UpdateMutationVariables>(UpdateDocument, options);
      }
export type UpdateMutationHookResult = ReturnType<typeof useUpdateMutation>;
export type UpdateMutationResult = Apollo.MutationResult<UpdateMutation>;
export type UpdateMutationOptions = Apollo.BaseMutationOptions<UpdateMutation, UpdateMutationVariables>;
export const namedOperations = {
  Query: {
    getAll: 'getAll'
  },
  Mutation: {
    add: 'add',
    delete: 'delete',
    update: 'update'
  }
}