import { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-react/components";

export default function LoggedIn() {
  const { user, login, getUserOrganizations } = useKindeAuth();
  const requiredOrgCode = import.meta.env.VITE_KINDE_PLATFORM_ORG_CODE;
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  useEffect(() => {
    const checkOrgAccess = async () => {
      const userOrgs = await getUserOrganizations();

      if (!userOrgs || !userOrgs.includes(requiredOrgCode)) {
        // Redirect to login if not part of the required org
        login({ orgCode: requiredOrgCode });
        return;
      }

      // Org check passed, allow rendering
      setIsCheckingAccess(false);
    };

    checkOrgAccess();
  }, [getUserOrganizations, requiredOrgCode, login]);

  if (isCheckingAccess) {
    // Optionally render a spinner or just return null
    return <p>Checking access...</p>;
  }

  return (
    <>
      <header>
        <nav className="nav container">
          <h1 className="text-display-3">KindeAuth</h1>
          <div className="profile-blob">
            {user?.picture !== "" ? (
              <img
                className="avatar"
                src={user?.picture}
                alt="user profile avatar"
              />
            ) : (
              <div className="avatar">
                {user?.givenName?.[0]}
                {user?.familyName?.[1]}
              </div>
            )}
            <div>
              <p className="text-heading-2">
                {user?.givenName} {user?.familyName}
              </p>
              <LogoutLink className="text-subtle">Sign out</LogoutLink>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="container">
          <div className="card start-hero">
            <p className="text-body-2 start-hero-intro">Woohoo!</p>
            <p className="text-display-2">
              Your authentication is all sorted.
              <br />
              Build the important stuff.
            </p>
            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={() => window.open("https://backoffice.abdelrahmanzaki.com", "_blank")}
              >
                Switch to Backoffice
              </button>
            </div>
          </div>
          <section className="next-steps-section">
            <h2 className="text-heading-1">Next steps for you</h2>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <strong className="text-heading-2">KindeAuth</strong>
          <p className="footer-tagline text-body-3">
            Visit our{" "}
            <a className="link" href="https://kinde.com/docs">
              help center
            </a>
          </p>

          <small className="text-subtle">
            © 2023 KindeAuth, Inc. All rights reserved
          </small>
        </div>
      </footer>
    </>
  );
}