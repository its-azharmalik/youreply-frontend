import { Col, Container, Row } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const FormContainer = ({ children }) => {
	return (
		<Container>
			<Row className='justify-content-md-center mt-5'>
				<Col xs={12} md={12} className='card'>
					{children}
				</Col>
			</Row>
		</Container>
	);
};

export default FormContainer;
