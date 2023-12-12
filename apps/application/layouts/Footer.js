import { Box, Button } from "@mui/material";
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const CustomFooter = (props) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col relative shrink-0 box-border min-h-[100px] bg-white w-full z-[1]">
            <section className="flex flex-col relative shrink-0 box-border min-h-[100px] bg-white w-full z-[1] self-stretch grow items-stretch mx-auto">
                <header className="relative shrink-0 box-border bg-orange-500 bg-opacity-40 w-full flex flex-col items-center mx-auto pb-0">
                    <img
                        loading="lazy"
                        sizes="(max-width: 998px) 16vw, 12vw"
                        srcSet="https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=155 155w" className="aspect-[0.67] object-cover object-center w-[155px] absolute shrink-0 box-border min-h-[20px] min-w-[20px] overflow-hidden top-[-3%] h-32 mt-5 left-[5%] max-md:hidden max-sm:hidden"
                        alt="Image 1"
                    />
                    <img
                        loading="lazy"
                        sizes="(max-width: 998px) 16vw, 12vw"
                        srcSet="https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F397f0eb3e8a7443c922ee7007b9db93c%2F6e361d21aece482db35b2230d0717cbe?width=155 155w" className="aspect-[0.67] object-cover object-center w-[155px] absolute shrink-0 box-border min-h-[20px] min-w-[20px] overflow-hidden h-32 mt-5 right-[5%] bottom-0 max-md:hidden max-sm:hidden"
                        alt="Image 2"
                    />
                    <h1 className="relative shrink-0 box-border h-auto text-slate-700 font-semibold text-5xl mt-12 mb-4 mx-auto">
                        {t('footer.title')}
                    </h1>
                    <p className="relative shrink-0 box-border h-auto max-w-[500px] text-center text-slate-700 mx-auto max-sm:px-2.5" dangerouslySetInnerHTML={{ __html: t('footer.description') }} />
                    <Box className="flex flex-col sm:flex-row w-fit justify-center items-center no-underline space-y-5 sm:space-y-0 sm:space-x-5 mt-5 mb-8">
                        <Link href="/contact-us" className="no-underline">
                            <Button
                                className="flex flex-col relative bg-white text-primary-main no-underline hover:bg-primary-main hover:text-white mx-auto rounded-lg"
                                variant="contained"
                                color="primary"
                            >
                                {t('footer.contact-us')}
                            </Button>
                        </Link>
                        <Link href="/support" className="no-underline">
                            <Button
                                className="flex flex-col relative bg-white text-primary-main no-underline hover:bg-primary-main hover:text-white mx-auto rounded-lg"
                                variant="contained"
                                color="primary"
                            >
                                {t('footer.support')}
                            </Button>
                        </Link>
                    </Box>
                    <div className="relative shrink-0 box-border h-auto mt-5 mb-8 mx-auto">
                        <p>© 2024 MyPortfolio</p>
                    </div>
                </header>
            </section>
        </div>
    );
}

export default CustomFooter;