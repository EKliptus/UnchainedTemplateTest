import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import CurrentUserFragment from '../fragments/CurrentUserFragment';
import { UserQuery } from './useUserQuery';

const LoginWithPasswordMutation = gql`
  mutation LoginWithPassword($email: String!, $password: String!) {
    loginWithPassword(email: $email, plainPassword: $password) {
      id
      token
      user {
        ...CurrentUserFragment
      }
    }
  }
  ${CurrentUserFragment}
`;

const useLoginWithPasswordMutation = () => {
  const client = useApolloClient();
  const [loginWithPasswordMutation, { error }] = useMutation(
    LoginWithPasswordMutation,
    {
      update(cache, result) {
        const newUser = result?.data?.loginWithPassword?.user;

        if (newUser) {
          cache.writeQuery({
            query: UserQuery,
            data: { me: newUser },
          });
        }
      },
    },
  );

  const loginWithPassword = async ({ email, password }) => {
    const result = await loginWithPasswordMutation({
      variables: { email, password },
    });
    await client.resetStore();
    return result;
  };

  return {
    loginWithPassword,
    error,
  };
};

export default useLoginWithPasswordMutation;
