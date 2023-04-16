import { Outlet } from 'react-router-dom';
import { Container } from './Container.styled';
import Header from './Header';
import { Suspense } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const SharedLayout = () => {
  return (
    <Container>
      <Header />
      <Suspense
        fallback={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#805ad5"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default SharedLayout;
