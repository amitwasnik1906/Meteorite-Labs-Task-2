// GraphQL queries and mutations
const LOGIN_MUTATION = `
  mutation Login($identifier: String!, $password: String!) {
    login(input: {
      identifier: $identifier
      password: $password
      provider: "local"
    }) {
      jwt
      user {
        id
        username
        email
        confirmed
        blocked
        role {
          description
          id
          name
          type
        }
      }
    }
  }
`;

const SIGNUP_MUTATION = `
  mutation Register($email: String!, $password: String!, $username: String!) {
    register(input: {
      email: $email
      password: $password
      username: $username
    }) {
      jwt
      user {
        id
        username
        email
        documentId
        confirmed
        blocked
        role {
          description
          id
          name
          type
        }
      }
    }
  }
`;

const GET_USERS_QUERY = `
  query GetUsers {
    users {
      id
      name
      email
      role
      confirmed
      createdAt
    }
  }
`;

const GRAPHQL_ENDPOINT = 'https://api-qa.seamasterai.com/graphql';

// GraphQL client function
const graphqlRequest = async (query: string, variables: any = {}, token?: string) => {
  const headers: any = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data;
};

export {
  graphqlRequest,
  GET_USERS_QUERY,
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  GRAPHQL_ENDPOINT
};
