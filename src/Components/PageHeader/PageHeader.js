import React from "react";
import { PageHeader } from "antd";
import { Typography } from "antd";
import { Layout } from "antd";

const PHeader = () => {
  const { Title } = Typography;
  const routes = [
    {
      breadcrumbName: "Home",
      path: `/`,
    },
    {
      path: `/about`,
      breadcrumbName: "About",
    },
  ];
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-12">
          <Layout>
            <div className="col-md-6 offset-md-3">
              <PageHeader
                className="site-page-header outer"
                breadcrumb={{ routes }}
              />
              <Title className="outer" level={2}>
                About Us
              </Title>
            </div>
          </Layout>
        </div>
      </div>
    </div>
  );
};

export default PHeader;
