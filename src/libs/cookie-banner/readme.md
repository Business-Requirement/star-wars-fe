# About

This component build to easy use cookie banner on reactjs app

# How to use

Copy this folder to your source code (or you can copy only `CookieBanner.tsx` and `CookieBanner.scss` file)  
Notice: This component also depend on `utils/script-loader.ts` so make sure to copy this too.

# Example

The easy way to use this cookie banner is add this to you `App.tsx` bellow the router so is can show in any part of website.

```tsx
const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="com-app">
        <Switch>
          {/*your multiple route here*/}
          <Route path="/" exact>
            {" "}
            <Home></Home>{" "}
          </Route>
        </Switch>
      </div>
      {/* simple include the component*/}
      <GLCookieBanner></GLCookieBanner>
    </Router>
  );
};
```
