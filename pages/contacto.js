/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Field, Form } from 'formik';
import axiosBase from '@/utils/axiosBase';
import PropTypes from 'prop-types';
import FeaturedProducts from 'components/FeaturedProducts';
import CategoriesNavbar from '@/components/CategoriesNavbar';
import { useRouter } from 'next/router';
import {
  Container,
  PageTitleH1,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  Input,
  Textarea,
  Label,
} from 'components/layouts/commonStyledComponents';
import { FaWhatsapp, FaEnvelope, FaFacebook } from 'react-icons/fa';
import { Button } from 'components/layouts/Button';
import contactData from '@/utils/contactData';
import MainLayout from '../components/layouts/MainLayout';

const ContactPageWrapper = styled.section`
  margin: 3em 1em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  margin: 3em 0;
  position: relative;

  :after {
    content: '';
    background: url('images/logo.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    opacity: 0.1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  @media (max-width: 760px) {
    display: grid;
    grid-template-columns: 1fr;
    /* grid-template-rows: 1fr 1fr; */
    grid-auto-flow: dense;
  }
`;

const FormFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2em;
  font-size: 1em;
`;

const ContactDetailWrapper = styled.div`
  border-left: 2px solid ${({ theme }) => theme.colors.background};
  padding: 0 2em;

  @media (max-width: 760px) {
    grid-row: 1;
    border-left: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.background};

    div {
      display: inline-block;
      margin-left: 1em;
    }
  }
`;

const ContactDetail = styled.div`
  font-size: 1.2em;
  margin: 1em 0;
`;

const SocialIcons = styled(ContactDetail)`
  display: flex;
  /* justify-content: space-between; */
  a {
    margin: 0 10px;
  }
`;

const InputError = styled.span`
  color: ${({ theme }) => theme.input.error};
  padding-left: 10px;
  font-weight: 400;
`;

const ContactPage = ({ categories, featuredProducts }) => {
  const [messageStatus, setMessageStatus] = useState({
    status: 'Enviar',
    isEmailSent: false,
    error: false,
  });
  const [preMessage, setPreMessage] = useState('');

  const Router = useRouter();
  useEffect(() => {
    if (Router.query.searched) {
      const parsedMessage = `Hola, busqué el producto "${Router.query.searched}" y no lo encontré en la página. ¿Tenes algo parecido a esto?`;
      setPreMessage(parsedMessage);
    }
    if (Router.query.product) {
      const parsedMessage = `Hola, me interesa el producto "${Router.query.product}", me podrías mandar mas información.`;
      setPreMessage(parsedMessage);
    }
  }, [Router.query.searched, Router.query.product]);

  return (
    <>
      <CategoriesNavbar _categories={categories} />
      <Container>
        <ContactPageWrapper>
          <PageTitleH1>Envianos un Mensaje</PageTitleH1>
          <Grid>
            <Formik
              enableReinitialize
              initialValues={{
                name: '',
                email: '',
                subject: '',
                phone: '',
                link: Router.query.link || '',
                message: preMessage || '',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Requerido';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                if (!values.name) {
                  errors.name = 'Requerido';
                } else if (!/[A-Z0-9]$/i.test(values.name)) {
                  errors.name = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                setMessageStatus({
                  status: 'enviando',
                  isEmailSent: null,
                  error: null,
                });

                axiosBase
                  .post('/mailing/send', values)
                  .then(() => {
                    setMessageStatus({
                      status: 'Mensaje Enviado',
                      isEmailSent: true,
                      error: false,
                    });
                  })
                  .catch((err) => {
                    console.error(err.response);
                    setSubmitting(false);
                    setMessageStatus({
                      status: 'ERROR:  Mensaje No Enviado',
                      isEmailSent: false,
                      error: true,
                    });
                  });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <Form onSubmit={handleSubmit}>
                  <FormFieldsWrapper>
                    <Label htmlFor="name">
                      Nombre
                      <InputError>
                        {errors.name && touched.name && errors.name}
                      </InputError>
                    </Label>
                    <Field
                      as={Input}
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />

                    <Label htmlFor="email">
                      Email
                      <InputError>
                        {errors.email && touched.email && errors.email}
                      </InputError>
                    </Label>
                    <Field
                      as={Input}
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />

                    <Label htmlFor="subject">
                      Asunto
                      <InputError>
                        {errors.subject && touched.subject && errors.subject}
                      </InputError>
                    </Label>
                    <Field
                      as={Input}
                      type="text"
                      id="subject"
                      name="subject"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subject}
                    />

                    <Label htmlFor="phone">
                      Teléfono
                      <InputError>
                        {errors.phone && touched.phone && errors.phone}
                      </InputError>
                    </Label>
                    <Field
                      as={Input}
                      type="phone"
                      id="phone"
                      name="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />

                    <Label htmlFor="link">
                      Link al Producto
                      <InputError>
                        {errors.link && touched.link && errors.link}
                      </InputError>
                    </Label>
                    <Field
                      as={Input}
                      type="link"
                      id="link"
                      name="link"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.link}
                    />

                    <Label htmlFor="message">
                      Mensaje
                      <InputError>
                        {errors.message && touched.message && errors.message}
                      </InputError>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      onChange={handleChange}
                      rows="10"
                      onBlur={handleBlur}
                      value={values.message}
                    />
                    <Button
                      type="submit"
                      disabled={
                        (isSubmitting || messageStatus.isEmailSent) && true
                      }
                    >
                      {messageStatus.status}
                    </Button>
                  </FormFieldsWrapper>
                </Form>
              )}
            </Formik>
            <ContactDetailWrapper>
              <ContactDetail>
                <a
                  href={`https://wa.me/${contactData.celularPhone.number}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contactData.celularPhone.display}
                </a>
              </ContactDetail>
              <ContactDetail>
                <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
              </ContactDetail>
              <SocialIcons>
                <FacebookIcon
                  href={contactData.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook />
                </FacebookIcon>
                <WhatsappIcon
                  href={`https://wa.me/${contactData.celularPhone.number}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp />
                </WhatsappIcon>
                <EmailIcon href={`mailto:${contactData.email}`}>
                  <FaEnvelope />
                </EmailIcon>
              </SocialIcons>
            </ContactDetailWrapper>
          </Grid>
          <FeaturedProducts featuredProducts={featuredProducts} />
        </ContactPageWrapper>
      </Container>
    </>
  );
};

ContactPage.Layout = MainLayout;

export default ContactPage;

ContactPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  featuredProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export async function getStaticProps() {
  const featuredProducts = await axiosBase('/product/featured').then(
    (res) => res.data,
  );
  const categories = await axiosBase('/category/all').then((res) => res.data);

  return {
    props: {
      categories,
      featuredProducts,
    },
    revalidate: 1,
  };
}
