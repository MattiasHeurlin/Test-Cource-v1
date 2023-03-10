/**
 * @jest-environment jsdom
 */
import * as functions from "../functions";
import * as main from "../main";
import { Todo } from "../models/Todo";

beforeEach(() => {
  jest.resetAllMocks();
  document.body.innerHTML = "";
});

describe("CreateNewTodo Tests", () => {
  test("Adds correct string", () => {
    const todos: Todo[] = [];
    const toDoText = "Success Test";
    let spyAddTodo = jest.spyOn(functions, "addTodo");
    let spyCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();

    main.createNewTodo(toDoText, todos);

    let result = todos[0].text;
    expect(spyAddTodo).toHaveBeenCalledTimes(1);
    expect(spyCreateHtml).toBeCalled();
    expect(result).toBe(toDoText);
  });
  test("Does not add incorrect string", () => {
    const todos: Todo[] = [];
    const toDoText = "a";
    let spyAddTodo = jest.spyOn(functions, "addTodo");
    let spyDisplayError = jest.spyOn(main, "displayError").mockReturnValue();

    main.createNewTodo(toDoText, todos);

    expect(spyAddTodo).toHaveBeenCalledTimes(1);
    expect(spyDisplayError).toBeCalled();
    expect(todos.length).toBe(0);
  });
});

test("CreateHtml -create html for each todo", () => {
  document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
  let todos = [
    new Todo("Take out the trash", false),
    new Todo("Do the dishes", true),
    new Todo("Buy groceries", false),
    new Todo("Finish homework", true),
    new Todo("Finish homework", false),
  ];
  main.createHtml(todos);
  const toDoLiElements = document.querySelectorAll(".todo__text");
  let checkToDoAmount = toDoLiElements.length;
  let checkToDoText = toDoLiElements[1].innerHTML;

  expect(checkToDoAmount).toBe(5);
  expect(checkToDoText).toBe("Do the dishes");
});

test("ToggleTodo - Change done status and update html", () => {
  let spyChangeTodo = jest.spyOn(functions, "changeTodo").mockReturnValue();
  let createHtml = jest.spyOn(main, "createHtml").mockReturnValue();
  const todo = { text: "test", done: false };

  main.toggleTodo(todo);

  expect(spyChangeTodo).toBeCalledTimes(1);
  expect(createHtml).toBeCalledTimes(1);
});

describe("DisplayError - tests", () => {
  test("Change error text, remove show class", () => {
    const errorText: string = "Error Test";
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    const errorContainer = document.querySelector("#error");

    main.displayError(errorText, false);

    expect(errorContainer?.innerHTML).toBe(errorText);
    expect(errorContainer?.classList.length).toBe(1);
  });
  test("Add show class", () => {
    const errorText: string = "Error Test";
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    const errorContainer = document.querySelector("#error");

    main.displayError(errorText, true);

    expect(errorContainer?.innerHTML).toBe(errorText);
    expect(errorContainer?.classList.length).toBe(2);
  });
});

test("ClearTodos - call two functions", () => {
  let todos = [
    new Todo("Take out the trash", false),
    new Todo("Do the dishes", true),
    new Todo("Buy groceries", false),
    new Todo("Finish homework", true),
    new Todo("Finish homework", false),
  ];
  let spyRemoveAllTodos = jest
    .spyOn(functions, "removeAllTodos")
    .mockReturnValue();
  let spyCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();

  main.clearTodos(todos);

  expect(spyRemoveAllTodos).toBeCalledTimes(1);
  expect(spyCreateHtml).toBeCalledTimes(1);
});

describe('Anonymous function tests', () => {

    test("Add eventListiner, with call to clearTodos - test click", () => {
        document.body.innerHTML = `<button type="button" id="clearTodos">Rensa lista</button>`;
        let spy = jest.spyOn(main, "clearTodos").mockReturnValue();
        let todos : Todo[] = [
          new Todo("Take out the trash", false)
        ];
      
        document.getElementById("clearTodos")?.addEventListener("click", () => {
          main.clearTodos(todos);
        });
      
        const button = document.querySelector("#clearTodos");
        const clickEvent = new MouseEvent("click", {
          view: window,
          bubbles: true,
        });
      
        button?.dispatchEvent(clickEvent);
      
        expect(spy).toBeCalledTimes(1);
      });
      
    test('newTodoForm - submit event', () => {
        document.body.innerHTML = `
        <form id="newTodoForm">
          <div>
            <input type="text" id="newTodoText" value="Test Submit"/>
            <button>Skapa</button>
            <button type="button" id="clearTodos">Rensa lista</button>
          </div>
          <div id="error" class="error"></div>
        </form>
      `;
      
      let todos: Todo[] = [
        new Todo("Take out the trash", false)
      ];
      
      let spy = jest.spyOn(main, "createNewTodo").mockReturnValue();
      
      const form = document.querySelector("#newTodoForm");
      (document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
        "submit",
        (e: SubmitEvent) => {
          e.preventDefault();
      
          let todoText: string = ( 
            document.getElementById("newTodoText") as HTMLInputElement
          ).value;
      
          main.createNewTodo(todoText, todos);
        }
      );
      const submitEvent = new Event("submit");
      
      form?.dispatchEvent(submitEvent);
      
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith("Test Submit", todos);
    })
});
