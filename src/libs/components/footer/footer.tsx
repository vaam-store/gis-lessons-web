import { Container } from '@comp/container';
import { Footer } from 'react-daisyui';

export default function AppFooter() {
  return (
    <div className='bg-base-200'>
      <Container>
        <Footer center>
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              Stephane S. (GIS Lessons)
            </p>
          </aside>
        </Footer>
      </Container>
    </div>
  );
}
