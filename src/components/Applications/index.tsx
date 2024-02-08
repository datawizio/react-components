import React, { useContext, useMemo } from "react";

import ConfigContext from "../ConfigProvider/context";
import { Application } from "./Application";
import { PageHeader } from "../../index";
import { AppsLoader } from "../AppsList/AppsLoader";
import { ApplicationsProps, IApp } from "./models";
import "./index.less";

const Applications: React.FC<ApplicationsProps> = ({ apps, onPrimaryButtonClick, loading, onSecondaryButtonClick }) => {

  const { translate } = useContext(ConfigContext);
  const availableSolutionsShown: boolean = useMemo(
    () => loading || !!apps.available_solutions?.length,
    [loading, apps]
  );
  const administrativeSolutionsShown: boolean = useMemo(
    () => loading || !!apps.administrative_solutions?.length,
    [loading, apps]
  );
  const otherSolutionsShown: boolean = useMemo(() => {
    return loading ||
      !!apps.other_solutions?.some(solution => solution.applications.length)
  }, [loading, apps]);

  return (
    <div className="applications-container">
      {
        availableSolutionsShown &&
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
                    tagColor={app.tariff_plan ? "green" : "grey"}
                    onPrimaryButtonClick={onPrimaryButtonClick}
                    onSecondaryButtonClick={onSecondaryButtonClick}
                  />
                )
            }
          </div>
        </div>
      }
      {
        administrativeSolutionsShown &&
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
        otherSolutionsShown &&
        <div className="applications-block">
          {<PageHeader title={!loading ? translate("ALL_SOLUTIONS") : ""} />}
          {
            loading ?
              <div className="apps-list">
                <AppsLoader />
              </div> :
              <div className="other-solutions-container">
                {
                  apps.other_solutions.map((solution) =>
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
                    </div>
                  )
                }
              </div>
          }
        </div>
      }
    </div>
  );
}

export default Applications;