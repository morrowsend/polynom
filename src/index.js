import React from "react"
import { render } from "react-dom"
import { Router, useRouterHistory } from "react-router"
import createHistory from "history/lib/createHashHistory"
import { Provider } from "react-redux"
import createStore from "./store"
import routes from "./routes"

if (__PROD__ && window.location.hostname !== "polynom.co") {
  window.location = "http://polynom.co"
}

const savedState = JSON.parse(localStorage.getItem("savedState"))
const store = savedState ? createStore(savedState) : createStore()

// save the state in localStorage
store.subscribe(() => {
  localStorage.setItem("savedState", JSON.stringify(store.getState().present))
})

const history = useRouterHistory(createHistory)({
  basename: "/",
})

render(
  <Provider store={ store }>
    <Router
      history={ history }
      routes={ routes } />
  </Provider>,
  document.querySelector("#root")
)
