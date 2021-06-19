import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import TodoComponent from "../TodoComponent";

afterEach(() => {
  cleanup();
});

test("should render non-completed todo", () => {
  const todo = { id: 1, title: "wash dishes", completed: false };
  render(<TodoComponent todo={todo} />);
  const todoElement = screen.getByTestId("todo-1");
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("wash dishes");
  expect(todoElement).not.toContainElement(screen.queryByTestId("strike"));
});

test("should render completed todo", () => {
  const todo = { id: 1, title: "car wash", completed: true };
  render(<TodoComponent todo={todo} />);
  const todoElement = screen.getByTestId("todo-1");
  //   console.log(screen.queryByTestId("strike"));
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("car wash");
  expect(todoElement).toContainElement(screen.queryByTestId("strike"));
});

test("matches snapshot", () => {
  const todo = { id: 1, title: "wash dishes", completed: true };
  const tree = renderer.create(<TodoComponent todo={todo} />).toJSON();
  expect(tree).toMatchSnapshot();
});
