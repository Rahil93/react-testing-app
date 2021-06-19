import "./App.css";
import EnrollmentForm from "./components/EnrollmentForm";
// import { ChakraProvider } from "@chakra-ui/react";
// import RegistrationForm from "./components/RegistrationForm";
// import LoginForm from "./components/LoginForm";
// import FormikContainer from "./components/FormikContainer";
// import YoutubeForm from "./components/YoutubeForm";
// import TodoComponent from "./components/TodoComponent";

function App() {
  // const todos = [
  //   { id: 1, title: "wash dishes", completed: false },
  //   { id: 2, title: "make dinner", completed: true },
  // ];
  return (
    // <ChakraProvider>
    <div className="App">
      <EnrollmentForm />
      {/* <RegistrationForm /> */}
      {/* <LoginForm /> */}
      {/* <FormikContainer /> */}
      {/* <YoutubeForm /> */}
      {/* {todos.map((todo) => {
        return <TodoComponent todo={todo} />;
      })} */}
      {/* <TodoComponent /> */}
    </div>
    // </ChakraProvider>
  );
}

export default App;
