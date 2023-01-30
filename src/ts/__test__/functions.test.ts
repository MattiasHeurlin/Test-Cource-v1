/**
 * @jest-environment jsdom
 */
import * as functions from '../functions';
import * as main from "../main";
import { Todo } from '../models/Todo';

beforeEach(() => {    
    jest.resetAllMocks();
    document.body.innerHTML = '';
  });

describe('AddTodo - Tests', () => {
    test('string shorter than 3, return false', () => {
        const testString = 'a';
        let todos = [
            new Todo("Take out the trash", false),
            new Todo("Do the dishes", true),
            new Todo("Buy groceries", false),
            new Todo("Finish homework", true),
            new Todo("Finish homework", false)
        ];
        let length = todos.length;
        const result = functions.addTodo(testString, todos);

        expect(todos.length).toBe(length);
        expect(result.success).toBe(false);
    })
    test('string longer than 3, add to array, and return true', () => {
        const testString = 'String Longer than 3';
        let todos = [
            new Todo("Take out the trash", false),
            new Todo("Do the dishes", true),
            new Todo("Buy groceries", false),
            new Todo("Finish homework", true),
            new Todo("Finish homework", false)
        ];
        let length = todos.length;
        const result = functions.addTodo(testString, todos);

        expect(todos.length).toBe(length + 1);
        expect(result.success).toBe(true);
    });
})

test('ChangeTodo - change todo done state', () => {
    let todo1 = new Todo('Do the dishes', true);
    let todo2 = new Todo('Buy grovies', false);

    functions.changeTodo(todo1);
    functions.changeTodo(todo2);

    expect(todo1.done).toBe(false);
    expect(todo2.done).toBe(true);
})

test('RemoveAllTodos - clear array', () => {
    let todos = [
        new Todo("Take out the trash", false),
        new Todo("Do the dishes", true),
        new Todo("Buy groceries", false),
        new Todo("Finish homework", true),
        new Todo("Finish homework", false)
    ];
    functions.removeAllTodos(todos);

    expect(todos.length).toBe(0);
})

test('Sort todos by text', () => {
    let todos = [
        new Todo("Test B", false),
        new Todo("Test A", true),
        new Todo("Test D", false),
        new Todo("Test C", true)
    ];

    functions.sortTodosByText(todos);

    expect(todos[0].text).toBe('Test A')
    expect(todos[1].text).toBe('Test B')
    expect(todos[2].text).toBe('Test C')
    expect(todos[3].text).toBe('Test D')
})