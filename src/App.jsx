
import './App.css'
import ExpensesTable from './components/expensestable'
import { Container, Row, Col, Button } from 'react-bootstrap';

function App() {
  // [user, userState] = useState()
  // [transaction, transactionState] = useState()

  // useEffect (() => {

  // },[user, transaction])

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <h1 className="text-center">
            SimpliTrac
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ExpensesTable />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-around">
          <Button variant="primary">Expense</Button>
          <Button variant="primary">Camera</Button>
          <Button variant="primary">Chart</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default App
