import { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-react/components";

export default function LoggedIn() {
  const { user, login, getOrganization } = useKindeAuth();
  const [currentOrg, setCurrentOrg] = useState("");

  useEffect(() => {
    const fetchOrg = async () => {
      const org = await getOrganization();
      setCurrentOrg(org ?? "None");
    };
    fetchOrg();
  }, [getOrganization]);

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
              Your authentication is all sorted in {currentOrg}.
              <br />
              Build the important stuff.
            </p>
            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.open(
                    'https://backoffice.abdelrahmanzaki.com',
                    '_blank'
                  )
                  login({
                    orgCode: import.meta.env.VITE_KINDE_BACKOFFICE_ORG_CODE,
                    connectionId: import.meta.env.VITE_KINDE_CONNECTION_ID,
                    loginHint: user?.email,
                  })
                }}
              >
                Switch to Backoffice
              </button>

              {/* <button
                className="btn btn-outline"
              >
                Switch to Platform
              </button> */}
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
