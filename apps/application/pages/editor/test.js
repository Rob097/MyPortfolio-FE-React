import HtmlContent from '@/components/utils/htmlContent';
import UserService from '@/services/user.service';
import { useEffect, useState } from 'react';

const Test = () => {
    const [content, setContent] = useState(null);
    const contentStr = '<section id="il29" class="text-gray-600 body-font"> </section> <section class="text-gray-600 body-font"> </section> <section class="text-gray-600 body-font"> </section> <section class="text-gray-600 body-font"> <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"> <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0"> <img alt="hero" src="https://dummyimage.com/720x600" class="object-cover object-center rounded"/> </div> <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center"> <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">[[firstName]]&nbsp;[[lastName]] </h1> <p class="mb-8 leading-relaxed">[[presentation]] </p> <div class="flex justify-center"> <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button> <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button> </div> </div> </div> </section>';

    useEffect(() => {
        UserService.getById(1).then(user => {
            // setUser(user?.content);
            setContent(replaceVariables(contentStr, user?.content));
        });
    }, []);

    const replaceVariables = (str, user) => {
        return str.replace(/\[\[(.*?)\]\]/g, function (_, g) {
            return user[g];
        });
    }

    return (
        <>
            <style>{'* {box-sizing: border-box;}body {margin: 0;}'}</style>
            <HtmlContent>
                {content}
            </HtmlContent>
        </>
    );
};

export default Test;