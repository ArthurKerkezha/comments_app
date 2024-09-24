import {
  Outlet,
  useLocation,
  useNavigation,
  useOutlet,
} from "react-router-dom";
import { Layout } from "antd";

import styles from "./RootLayout.module.less";
import FormContentWrapper from "./shared/components/FormContentWrapper";

const { Content, Header } = Layout;

const RootLayout = () => {
  const navigation = useNavigation();
  const outlet = useOutlet();
  const location = useLocation();

  console.log(location);
  console.log(outlet);
  console.log(navigation);

  return (
    <Layout className={styles.layout}>
      <Header>
        <span className="white-text">Hello world !!!</span>
      </Header>
      <Layout>
        <Content className={styles.layoutContent}>
          <Outlet />
        </Content>
        <FormContentWrapper />
      </Layout>
    </Layout>
  );
};

export default RootLayout;
