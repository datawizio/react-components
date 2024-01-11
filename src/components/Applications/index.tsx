import React, { useContext } from "react";

import "./index.less";
import ConfigContext from "../ConfigProvider/context";
import { Application } from "./Application";
import { PageHeader } from "../../index";
import { AppsLoader } from "../AppsList/AppsLoader";
import { ApplicationsProps, IApp } from "./models";

const Applications: React.FC<ApplicationsProps> = ({ apps, onPrimaryButtonClick, loading, onSecondaryButtonClick }) => {

  const { translate } = useContext(ConfigContext);

  return (
    <div className="applications-container">
      {
        (loading || !!apps.available_solutions?.length) &&
        <div className="applications-block">
          {<PageHeader title={!loading ? translate("AVAILABLE_SOLUTIONS") : ""} />}
          <div className="apps-list">
            {
              loading ?
                <AppsLoader /> :
                apps.available_solutions.map((app: IApp) =>
                  <Application
                    key={app.id}
                    app={app}
                    tagColor={"green"}
                    onPrimaryButtonClick={onPrimaryButtonClick}
                    onSecondaryButtonClick={onSecondaryButtonClick}
                  />
                )
            }
          </div>
        </div>
      }
      {
        (loading || !!apps.administrative_solutions?.length) &&
        <div className="applications-block">
          {<PageHeader title={!loading ? translate("ADDITIONAL_SOLUTIONS") : ""} />}
          <div className="apps-list">
            {
              loading ?
                <AppsLoader /> :
                apps.administrative_solutions.map((app: IApp) =>
                  <Application key={app.id} app={app} onPrimaryButtonClick={onPrimaryButtonClick} />
                )
            }
          </div>
        </div>
      }
      {
        (
          loading ||
          !!apps.other_solutions?.some(solution => solution.applications.length) ||
          !!apps.extensions?.length
        ) &&
        <div className="applications-block">
          {<PageHeader title={!loading ? translate("ALL_SOLUTIONS") : ""} />}
          {
            loading ?
              <div className="apps-list">
                <AppsLoader />
              </div> :
              <div className="other-solutions-container">
                {
                  apps.other_solutions.map((solution, index: number) =>
                    <div key={solution.name}>
                      <div className="other-solution-block">
                        <div className="other-solution-title">{translate(solution.name)}</div>
                        <div className="apps-list">
                          {
                            solution.applications.map((app: IApp) =>
                              <Application key={app.id} app={app} onPrimaryButtonClick={onPrimaryButtonClick} />
                            )
                          }
                        </div>
                      </div>
                      {
                        (!index && !!apps.extensions?.length) &&
                        <div className="other-solution-block extensions-block">
                          <div className="other-solution-title">{translate("EXTENSIONS")}</div>
                          <div className="apps-list">
                            {
                              apps.extensions.map((app: IApp) =>
                                <Application key={app.id} app={app} onPrimaryButtonClick={onPrimaryButtonClick} />
                              )
                            }
                          </div>
                        </div>
                      }
                    </div>
                  )
                }
                {
                  (!apps.other_solutions?.length && !!apps.extensions?.length) &&
                  <div className="other-solution-block">
                    <div className="other-solution-title">{translate("EXTENSIONS")}</div>
                    <div className="apps-list">
                      {
                        apps.extensions.map((app: IApp) =>
                          <Application key={app.id} app={app} onPrimaryButtonClick={onPrimaryButtonClick} />
                        )
                      }
                    </div>
                  </div>
                }
              </div>
          }
        </div>
      }
    </div>
  );
}

export default Applications;