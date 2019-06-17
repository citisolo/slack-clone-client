import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Home = ({ data: { allUsers = [] }, history }) => {
	history.push('/view-team');
	return null;
};

const allUsersQuery = gql`
	{
		allUsers {
			id
			email
		}
	}
`;

export default graphql(allUsersQuery)(Home);
