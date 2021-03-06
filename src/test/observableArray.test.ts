import { observableArray } from "../Observable/observableArray";

//todo проверять еще  и внутреннее значение объектов
describe("observableArray", () => {
  test("observableArray is defined", () => {
    expect(observableArray).toBeDefined();
  });

  test("observableArray should get value", () => {
    const array = [1, 2, 3, 4];
    const observerArray = observableArray(array);

    expect(observerArray[0]).toBe(1);
  });

  test("observableArray should set value", () => {
    const array = [1, 2, 3, 4];
    const observerArray = observableArray(array);
    observerArray[2] = 42;

    expect(observerArray[2]).toBe(42);
    //todo надо ли копировать изнчальные объекты?
    // expect(array[2]).toBe(2);
  });

  test("push one value to array", () => {
    const array = [1, 2, 3, 4];
    const observerArray = observableArray(array);

    observerArray.push(42);

    expect(observerArray.length).toBe(5);
    expect(observerArray[4]).toBe(42);
  });

  test("push few values to array", () => {
    const array = [1, 2, 3, 4];
    const observerArray = observableArray(array);

    observerArray.push(42, 228, 1337);

    expect(observerArray.length).toBe(7);
    expect(observerArray[4]).toBe(42);
    expect(observerArray[5]).toBe(228);
    expect(observerArray[6]).toBe(1337);
  });

  test("remove values using force set length", () => {
    const array = [1, 2, 3, 4];
    const observerArray = observableArray(array);

    observerArray.length = 1;

    expect(observerArray.length).toBe(1);
    expect(observerArray[1]).toBe(undefined);
  });

  test("add empty values using force set length", () => {
    const array = [1];
    const observerArray = observableArray(array);

    observerArray.length = 4;

    expect(observerArray.length).toBe(4);
    expect(observerArray[0]).toBe(1);
    expect(observerArray[1]).toBe(undefined);
    expect(observerArray[2]).toBe(undefined);
    expect(observerArray[3]).toBe(undefined);
  });

  test("should get plain object", () => {
    const array = [{ aboba: "sus" }];
    const observerArray = observableArray(array);

    expect(observerArray[0]).toStrictEqual({ aboba: "sus" });
  });

  //todo обработать этот кейс
  // test("should get p1lain object", () => {
  //   const array = [1];
  //   const observerArray = observableArray(array);
  //   observerArray.length = 4;
  //   expect(observerArray.length).toStrictEqual(4);
  // });

  test("array splice method", () => {
    const array = [1, 2, 3, 4];
    const observerArray = observableArray(array);

    //@ts-ignore
    expect(observerArray.splice()).toMatchObject([]);
    expect(observerArray).toMatchObject([1, 2, 3, 4]);

    expect(observerArray.splice(1, 1)).toMatchObject([2]);
    expect(observerArray).toMatchObject([1, 3, 4]);

    expect(observerArray.splice(1, 1, 228)).toMatchObject([3]);
    expect(observerArray).toMatchObject([1, 228, 4]);

    expect(observerArray.splice(0)).toMatchObject([1, 228, 4]);
    expect(observerArray).toMatchObject([]);
  });

  test("array shift method", () => {
    const array = [1, 2, 3, 4];
    const observerArray = observableArray(array);

    expect(observerArray.shift()).toBe(1);
    expect(observerArray).toMatchObject([2, 3, 4]);
  });

  test("array unshift method", () => {
    const array = [1, 2, 3, 4];
    const observerArray = observableArray(array);

    expect(observerArray.unshift(-1, 0)).toBe(6);
    expect(observerArray).toMatchObject([-1, 0, 1, 2, 3, 4]);
  });

  test("array pop method", () => {
    const array = [1, 2, 3, 4];
    const observerArray = observableArray(array);

    expect(observerArray.pop()).toBe(4);
    expect(observerArray).toMatchObject([1, 2, 3]);
  });

  test("array reverse method", () => {
    const array = [1, 2, 3, { a: "hello" }];
    const observerArray = observableArray(array);

    expect(observerArray.reverse()).toMatchObject([{ a: "hello" }, 3, 2, 1]);
    expect(observerArray).toMatchObject([{ a: "hello" }, 3, 2, 1]);
  });

  test("array sort method", () => {
    const array = [4, 3, 2, 1];
    const observerArray = observableArray(array);

    expect(observerArray.sort()).toMatchObject([1, 2, 3, 4]);
    expect(observerArray).toMatchObject([1, 2, 3, 4]);

    expect(observerArray.sort((a, b) => b - a)).toMatchObject([4, 3, 2, 1]);
    expect(observerArray).toMatchObject([4, 3, 2, 1]);
  });

  test("array with JSONStringify", () => {
    const array = [1, 2, 3, { a: "hello" }];
    const observerArray = observableArray(array);

    expect(JSON.stringify(observerArray)).toBe(`[1,2,3,{\"a\":\"hello\"}]`);
  });
});
