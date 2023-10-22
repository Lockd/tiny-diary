import {
  Link,
  Navigate,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page" className={styles.errorPageContainer}>
        <div className={styles.errorPage}>
          <h1 className={styles.errorPageTitle}>Oops! {error.status}</h1>
          <p className={styles.errorPageMessage}>{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
          <Link to={"/"} className={styles.goHomeButton}>
            Home Page
          </Link>
        </div>
      </div>
    );
  } else {
    return <Navigate to={"/"} />;
  }
};

export default ErrorPage;
