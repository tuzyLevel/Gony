//const foo = document.getElementById('foo');
// const foo = document.querySelector("#foo");

import { nextTick } from "process";

// foo?.insertAdjacentHTML("beforebegin", "<p>beforebegin</p>");
// foo?.insertAdjacentHTML("afterbegin", "<p>afterbegin</p>");
// foo?.insertAdjacentHTML("beforeend", "<p>beforeend</p>");
// foo?.insertAdjacentHTML("afterend", "<p>afterend</p>");

// const fruits = document.getElementById("fruits");

// const btn = document.getElementById("btn");
// btn?.addEventListener("click", () => {
//   const $li = document.createElement("li");
//   //   const textNode = document.createTextNode("Banana");
//   $li.className = "banana";
//   $li.textContent = "Banana";
//   //   $li.appendChild(textNode);
//   fruits?.appendChild($li);
// });

// const deleteBtn = document.getElementById("deleteBtn");
// deleteBtn?.addEventListener("click", () => {
//   const firstLi = fruits?.firstElementChild;
//   if (fruits?.hasChildNodes() && firstLi) {
//     fruits!.removeChild(firstLi);
//   }
// });
// //This case generates reflow and repaint 3 times
// ["Apple", "Banana", "Orange"].forEach((fruit) => {
//   const element = document.createElement("li");
//   element.textContent = fruit;
//   fruits?.appendChild(element);
// });

// //This case use fragment to avoid wasting resources
// const fragment = document.createDocumentFragment();
// ["Apple", "Banana", "Orange"].forEach((fruit) => {
//   const element = document.createElement("li");
//   element.textContent = fruit;
//   fragment.appendChild(element);
// });
// fruits?.appendChild(fragment);

// const beInsertedTag = document.createElement("li");
// beInsertedTag.appendChild(document.createTextNode("Target"));
// fruits?.insertBefore(beInsertedTag, null);

// const fruits = document.getElementById("fruits");
// const fragment = document.createDocumentFragment();
// ["Apple", "Banana", "Kiwi"].forEach((fruit) => {
//   const element = document.createElement("li");
//   element.textContent = fruit;
//   fragment.appendChild(element);
// });
// fruits?.appendChild(fragment);

// const [apple, banana] = fruits!.children;

// fruits?.removeChild(banana);
// const input = document.getElementById("user") as HTMLInputElement;

// input!.oninput = (event: Event) => {
//   console.log(input.value);
// };

// const newInput = document.createElement("input");
// newInput.setAttribute("type", "checkbox");
// newInput.setAttribute("checked", "checked");
// const body = document.getElementById("root");
// body?.appendChild(newInput);
// console.log(newInput.checked);
// const users = [...document.querySelector(".users")!.children];

// const user = users.find((user) => {
//   if (user instanceof HTMLElement) {
//     return user.dataset.userId === "7621";
//   }
// });

// if (user instanceof HTMLElement) {
//   console.log(user.dataset.role);
// }

// if (user instanceof HTMLElement) {
//   user.dataset.role = "admin";
//   console.log(user.dataset);
// }

// const $div = document.querySelector("div") as HTMLElement;

// console.log($div.style);
// $div.style.color = "blue";

// $div.style.width = "100px";
// $div.style.height = "100px";
// $div.style.backgroundColor = "yellow";

// const $box = document.querySelector(".box") as Element;

// // console.log($box.className);
// console.log($box.classList);
// // $box.className = $box.className.replace("red", "blue");
// $box.classList.replace("red", "blue");

// const computedStyle = window.getComputedStyle($box);
// console.log(computedStyle);

// console.log(computedStyle.width);
// console.log(computedStyle.height);
// console.log(computedStyle.backgroundColor);
// console.log(computedStyle.border);
// const $box = document.querySelector(".box") as Element;

// const computedStyle = window.getComputedStyle($box, ":before");

// console.log(computedStyle.getPropertyValue("content"));

// const $button = document.querySelector("button");
// $button?.addEventListener("click", () => {
//   console.log("Hello there~");
// });

// const timeoutId = setTimeout(
//   (name) => {
//     console.log(`Hi ${name}`);
//   },
//   0,
//   "Lee"
// );

// clearTimeout(timeoutId);

// let count = 1;

// const intervalId = setInterval(() => {
//   console.log(count);
//   if (count++ === 5) {
//     clearInterval(intervalId);
//     console.log("Everything is done!");
//   }
// }, 1000);

// const $button = document.querySelector("button");
// const $normalMsg = document.querySelector(".normal-msg");
// const $debounceMsg = document.querySelector(".debounce-msg");
// const $throttleMsg = document.querySelector(".throttle-msg");

// const debounce = (callback: Function, delay: number) => {
//   let timerId: number | null;
//   return (event: Event) => {
//     if (timerId) clearTimeout(timerId);
//     timerId = setTimeout(callback, delay, event);
//   };
// };

// const throttle = (callback: Function, delay: number) => {
//   let timerId: number | null;

//   return (event: Event) => {
//     if (timerId) return;
//     timerId = setTimeout(
//       () => {
//         callback(event);
//         timerId = null;
//       },
//       delay,
//       event
//     );
//   };
// };

// $button?.addEventListener("click", () => {
//   if ($normalMsg?.textContent) {
//     $normalMsg.textContent = String(+$normalMsg.textContent + 1);
//   }
// });

// $button?.addEventListener(
//   "click",
//   debounce(() => {
//     if ($debounceMsg?.textContent) {
//       $debounceMsg.textContent = String(+$debounceMsg.textContent + 1);
//     }
//   }, 500)
// );

// $button?.addEventListener(
//   "click",
//   throttle(() => {
//     if ($throttleMsg?.textContent) {
//       $throttleMsg.textContent = String(+$throttleMsg.textContent + 1);
//     }
//   }, 500)
// );

// const $input = document.querySelector("input");
// const $msg = document.querySelector(".msg");

// const debounce = (callback: Function, delay: number) => {
//   let timerId: number;

//   return (event: Event) => {
//     if (timerId) clearTimeout(timerId);
//     timerId = setTimeout(callback, delay, event);
//   };
// };

// if ($input) {
//   $input.oninput = debounce((e: Event) => {
//     const target = e.target as HTMLInputElement;
//     $msg!.textContent = target.value;
//   }, 300);
// }
// const $container = document.querySelector(".container");
// const $normalCount = document.querySelector(".normal-count");
// const $throttleCount = document.querySelector(".throttle-count");

// const throttle = (callback: Function, delay: number) => {
//   let timerId: number | null;
//   return (event: Event) => {
//     if (timerId) return;
//     timerId = setTimeout(
//       () => {
//         callback(event);
//         timerId = null;
//       },
//       delay,
//       event
//     );
//   };
// };

// let normalCount = 0;
// $container?.addEventListener("scroll", () => {
//   $normalCount!.textContent = String(++normalCount);
// });

// let throttleCount = 0;
// $container?.addEventListener(
//   "scroll",
//   throttle(() => {
//     $throttleCount!.textContent = String(++throttleCount);
//   }, 100)
// );

// function sleep(func: Function, delay: number) {
//   const delayUntil = Date.now() + delay;

//   while (Date.now() < delayUntil);

//   func();
// }

// function foo() {
//   console.log("foo");
// }
// function bar() {
//   console.log("bar");
// }

// sleep(foo, 3 * 1000);
// bar();

// function foo() {
//   console.log("foo");
// }

// function bar() {
//   console.log("bar");
// }

// setTimeout(foo, 0);
// bar();

// const obj = {
//   name: "Lee",
//   age: 20,
//   alive: true,
//   hobby: ["traveling", "tennis"],
// };

// const json = JSON.stringify(obj);
// console.log(typeof json, json);

// const prettyJson = JSON.stringify(obj, null, 2);
// console.log(typeof prettyJson, prettyJson);

// function filter(key: string, value: any) {
//   console.log(key, value);
//   return typeof value === "number" ? undefined : value;
// }

// const strFilteredObject = JSON.stringify(obj, filter, 2);
// console.log(typeof strFilteredObject, strFilteredObject);

// const todos = [
//   { id: 1, content: "HTML", completed: false },
//   { id: 2, content: "CSS", completed: true },
//   { id: 3, content: "JavaScript", completed: false },
// ];

// console.log(JSON.stringify(todos));

// const parsed = JSON.parse(JSON.stringify(todos));
// console.log(typeof parsed, parsed);

// const xhr = new XMLHttpRequest();

// const getRequest = (str: string) => {
//   xhr.open("GET", `https://swapi.dev/api/${str}`);
//   xhr.setRequestHeader("content-type", "application/json");
//   return xhr.send();
// };

// console.log(getRequest("people/1"));

// const get = (url: string) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url);
//   xhr.send();

//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       return JSON.parse(xhr.response);
//     } else {
//       console.error(`${xhr.status} ${xhr.statusText}`);
//     }
//   };
// };

// const response = get("https://jsonplaceholder.typicode.com/posts/1");

// console.log(response);
// const get = (
//   url: string,
//   successCallback: Function,
//   failureCallback: Function
// ) => {
//   const xhr = new XMLHttpRequest();

//   xhr.open("GET", url);
//   xhr.send();

//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       successCallback(JSON.parse(xhr.response));
//     } else {
//       failureCallback(xhr.status);
//     }
//   };
// };

// get("https://jsonplaceholder.typicode.com/posts/1", console.log, console.log);

// const get = (url: string, callback: Function) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url);

//   xhr.send();

//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       callback(JSON.parse(xhr.response));
//     } else {
//       console.error(`${xhr.status} ${xhr.statusText}`);
//     }
//   };
// };

// const url = "https://jsonplaceholder.typicode.com";

// get(`${url}/posts/1`, ({ userId }: { userId: number }) => {
//   console.log(userId);

//   get(`${url}/users/${userId}`, (userInfo: Object) => {
//     console.log(userInfo);
//   });
// });

// try {
//   setTimeout(() => {
//     throw (new Error("Error!"), 1000);
//   });
// } catch (e) {
//   console.error("catched error", e);
// }

// const promise = new Promise((resolve, reject) => {
//   let isSuccess = true;
//   if (isSuccess) {
//     resolve("result");
//   } else {
//     reject("failure reason");
//   }
// });

// const promiseGet = (url: string) => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url);
//     xhr.send();

//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         resolve(JSON.parse(xhr.response));
//       } else {
//         reject(new Error(String(xhr.status)));
//       }
//     };
//   });
// };

// promiseGet("https://jsonplaceholder.typicode.com/posts/1")
//   .then((data) => {
//     console.log(data);
//     console.log("success!");
//   })
//   .catch((data) => {
//     console.log(data);
//     console.log("failed!");
//   });

// const fulfilled = new Promise((resolve) => resolve(1));

// new Promise((resolve) => resolve("fulfilled")).then(
//   (v) => console.log(v),
//   (e) => console.error(e)
// );

// const promiseGet = (url: string) => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url);
//     xhr.send();

//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         resolve(JSON.parse(xhr.response));
//       } else {
//         reject(new Error(String(xhr.status)));
//       }
//     };
//   });
// };

// // promiseGet("https://jsonplaceholder.typicode.com/posts/1")
// //   .then((res) => console.log(res))
// //   .catch((err) => console.error(err))
// //   .finally(() => console.log("Bye!"));

// const wrongURL = "https://jsonplaceholer.typicode.com/XXX/1";

// promiseGet(wrongURL)
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err))
//   .finally(() => console.log("Bye Bye!"));

// const url = "https://jsonplaceholder.typicode.com";

// promiseGet(`${url}/posts/1`)
//   .then((data) => {
//     const obj = data as { userId: string };
//     const userId = obj.userId;
//     return promiseGet(`${url}/users/${userId}`);
//   })
//   .then((userInfo) => console.log(userInfo))
//   .catch((err) => console.error(err));

// const resolvedPromise = Promise.resolve([1, 2, 3]);
// resolvedPromise.then(console.log);

// const rejectedPromise = Promise.reject(new Error("Error occurs!"));
// rejectedPromise.then(console.error);
// let starts = Date.now();
// const requestData1 = () =>
//   new Promise((resolve) => setTimeout(() => resolve(1), 3000));
// const requestData2 = () =>
//   new Promise((resolve) => setTimeout(() => resolve(2), 2000));
// const requestData3 = () =>
//   new Promise((resolve) => setTimeout(() => resolve(3), 1000));

// const res: any = [];
// requestData1()
//   .then((data) => {
//     res.push(data);
//     return requestData2();
//   })
//   .then((data) => {
//     res.push(data);
//     return requestData3();
//   })
//   .then((data) => {
//     res.push(data);
//     console.log(res);
//   })
//   .catch(console.error)
//   .finally(() => {
//     console.log((Date.now() - starts) / 1000);
//   });

// starts = Date.now();
// Promise.all([requestData1(), requestData2(), requestData3()])
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => {
//     console.log((Date.now() - starts) / 1000);
//   });

// const promiseGet = (url: string) => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url);
//     xhr.send();

//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         resolve(JSON.parse(xhr.response));
//       } else {
//         reject(new Error(String(xhr.status)));
//       }
//     };
//   });
// };
// const githubids = ["jeresig", "ahejlsberg", "ungmo2"];

// Promise.all(
//   githubids.map((id: string) => {
//     return promiseGet(`https://api.github.com/users/${id}`);
//   })
// )
//   .then((users: any) => users.map((user: { name: string }) => user.name))
//   .then(console.log)
//   .catch(console.error);

// Promise.race([
//   new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
//   new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
//   new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
// ])
//   .then(console.log)
//   .catch(console.error);

// Promise.allSettled([
//   new Promise((resolve) => setTimeout(() => resolve(1), 2000)),
//   new Promise((_, reject) =>
//     setTimeout(() => reject(new Error("Error!")), 1000)
//   ),
// ]).then(console.log);

// const promise = fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   .then((json) => {
//     console.log(json);
//   });

// const wrongUrl = "https://jsonplaceholder.typicode.com/XXX/1";

// fetch(wrongUrl)
//   .then((response) => {
//     if (!response.ok) throw new Error(response.statusText);
//     return response.json();
//   })
//   .then((todo) => {
//     console.log(todo);
//   })
//   .catch((err) => console.error(err));

// const request = {
//   get(url: string) {
//     return fetch(url);
//   },
//   post(url: string, payload: Object) {
//     return fetch(url, {
//       method: "POST",
//       headers: { "content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//   },
//   patch(url: string, payload: Object) {
//     return fetch(url, {
//       method: "PATCH",
//       headers: { "content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//   },
//   delete(url: string) {
//     return fetch(url, { method: "DELETE" });
//   },
// };

// request
//   .get("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => {
//     if (!response.ok) throw new Error(response.statusText);
//     return response.json();
//   })
//   .then((todos) => console.log(todos))
//   .catch((err) => console.error(err));

// request
//   .patch("https://jsonplaceholder.typicode.com/todos/1", { completed: true })
//   .then((response) => {
//     if (!response.ok) throw new Error(response.statusText);
//     return response.json();
//   })
//   .then((todos) => console.log(todos))
//   .catch((err) => console.error(err));

// request
//   .delete("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => {
//     if (!response.ok) throw new Error(response.statusText);
//     return response.json();
//   })
//   .then((todos) => console.log(todos))
//   .catch((err) => console.error(err));

// function* genDecFunc() {
//   yield 1;
// }

// const genExpFunc = function* () {
//   yield 1;
// };

// const obj = {
//   *genObjMethod() {
//     yield 1;
//   },
// };

// class Myclass {
//   *genClsMethod() {
//     yield 1;
//   }
// }

// console.log(obj.genObjMethod().next());

// function* genFunc() {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// const generator = genFunc();

// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

// function* genFunc() {
//   const x: number = yield 1;

//   const y: number = yield x + 10;

//   return x + y;
// }

// const generator = genFunc();

// let res = generator.next();
// console.log(res);

// res = generator.next(10);
// console.log(res);

// res = generator.next(20);
// console.log(res);

// const infiniteFibonacci = (function () {
//   let [pre, cur] = [0, 1];

//   return {
//     [Symbol.iterator]() {
//       return this;
//     },
//     next() {
//       [pre, cur] = [cur, pre + cur];

//       return { value: cur };
//     },
//   };
// })();

// for (const num of infiniteFibonacci) {
//   if (num > 10000) break;
//   console.log(num);
// // }

// const infiniteFibonacci = (function* () {
//   let [pre, cur] = [0, 1];

//   while (true) {
//     [pre, cur] = [cur, pre + cur];
//     yield cur;
//   }
// })();

// console.log(infiniteFibonacci.next()); //1
// console.log(infiniteFibonacci.next()); //2
// console.log(infiniteFibonacci.next()); //3

// const async = (generatorFunc: GeneratorFunction) => {
//   const generator = generatorFunc();

//   const onResolved = (arg: any): any => {
//     const result = generator.next(arg);
//     const resultValue = result.value;

//     return result.done
//       ? resultValue
//       : resultValue.then((res: any) => onResolved(res));
//   };
//   return onResolved;
// };

// async(
//   (function* fetchTodo(): any {
//     const url = "https://jsonplaceholder.typicode.com/todos/1";

//     const response = yield fetch(url);
//     const todo: string = yield response.json();
//     console.log(todo);
//   })()
// );

const getGithubUserName = async (id: string) => {
  const res = await fetch(`https://api.github.com/users/${id}`);
  const { name } = await res.json();
  console.log(name);
};

getGithubUserName("ungmo2");
