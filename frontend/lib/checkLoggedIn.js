import gql from 'graphql-tag'

export default (context, apolloClient) => {
  return apolloClient.query({
    query: gql`
      query loggedInUser {
        loggedInUser {
          id,
          name
        }
      }
    `
  }).then(({ data }) => {
    return data
  }).catch((e) => {
    console.log(e)
    // Fail gracefully
    return { loggedInUser: {} }
  })
}
