import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MetaDataProps } from '@/types/components/global';
import BasicHeader from '@/components/BasicHeader';
import Accordion from '@/components/accordion/Accordion';
import AccordionItem from '@/components/accordion/AccordionItem';
import ShuffleTextInOut from '@/components/gsap/ShuffleTextInOut';
import TranslateInOut from '@/components/gsap/TranslateInOut';

export default function AccordionPage({}: InferGetStaticPropsType<
    typeof getStaticProps
>) {
    const items = [
        {
            header: 'What is Lorem Ipsum?',
            content:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius consequatur quisquam voluptatem ea maxime ut est. Ex, quibusdam quod. Quod animi odit error debitis veniam sunt dicta adipisci, quidem architecto? Ultrices mi tempus imperdiet nulla malesuada pellentesque. Praesent elementum facilisis leo vel fringilla est. Ornare arcu odio ut sem nulla pharetra diam sit. Etiam erat velit scelerisque in dictum non consectetur. Porttitor leo a diam sollicitudin tempor id eu nisl. Sagittis eu volutpat odio facilisis mauris sit amet. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Elementum sagittis vitae et leo duis ut diam. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Quis imperdiet massa tincidunt nunc pulvinar. Nulla aliquet porttitor lacus luctus accumsan tortor. Euismod quis viverra nibh cras pulvinar.',
        },
        {
            header: 'Where does it come from?',
            content:
                'Suspendisse amet consectetur adipisicing elit. Eius consequatur quisquam voluptatem ea maxime ut est. Auctor elit sed vulputate mi sit amet. Interdum consectetur libero id faucibus. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Sed odio morbi quis commodo odio aenean sed adipiscing diam. Interdum velit laoreet id donec. At varius vel pharetra vel turpis. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Sit amet venenatis urna cursus. Volutpat ac tincidunt vitae semper quis. Id diam maecenas ultricies mi eget. Risus feugiat in ante metus dictum at. Vel fringilla est ullamcorper eget nulla facilisi. Non consectetur a erat nam at lectus urna duis. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Placerat vestibulum lectus mauris ultrices eros in. Quam nulla porttitor massa id neque. Suspendisse faucibus interdum posuere lorem ipsum. Pharetra vel turpis nunc eget lorem dolor sed viverra. Dui sapien eget mi proin. Id nibh tortor id aliquet.',
        },
        {
            header: 'Why do we use it?',
            content:
                'Quisque eget luctus mi, vehicula mollis lorem amet consectetur adipisicing elit. Eius consequatur quisquam voluptatem ea maxime ut est...Lectus sit amet est placerat. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Interdum velit laoreet id donec ultrices tincidunt arcu non. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Platea dictumst quisque sagittis purus sit amet. Adipiscing tristique risus nec feugiat in. Pellentesque elit ullamcorper dignissim cras. Nunc sed id semper risus in hendrerit. Orci a scelerisque purus semper eget duis at tellus. Eget arcu dictum varius duis at consectetur. Nunc pulvinar sapien et ligula ullamcorper malesuada.',
        },
    ];

    return (
        <>
            <BasicHeader title="Accordion" />
            <div className="u-spacing--responsive--bottom">
                <div className="o-container--small">
                    <ShuffleTextInOut delay={0.3} target="#usage">
                        <h2 id="usage">Usage</h2>
                    </ShuffleTextInOut>
                    <div className="u-overflow--hidden">
                        <TranslateInOut delay={0.4} y="100%">
                            <div className="o-wysiwyg">
                                <p>
                                    An accordion is created by wrapping any
                                    number of <strong>AccordionItem</strong>{' '}
                                    components inside an{' '}
                                    <strong>Accordion</strong> component.
                                </p>
                            </div>
                        </TranslateInOut>
                    </div>
                    <Accordion>
                        {items.map(({ header, content }, i) => (
                            <AccordionItem
                                header={header}
                                headingClassName="h6"
                                id={i}
                                key={i}
                                delay={items.length / 10 + i / 10}
                                delayOut={items.length / 10 - i / 10}
                            >
                                <div className="o-wysiwyg">
                                    <p>{content}</p>
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
            <div className="u-spacing--responsive--bottom">
                <div className="o-container--small">
                    <ShuffleTextInOut delay={0.3} target="#multiple" watch>
                        <h2 id="multiple">Allowing multiple</h2>
                    </ShuffleTextInOut>
                    <div className="u-overflow--hidden">
                        <TranslateInOut
                            delay={0.4}
                            y="100%"
                            start="-100% bottom"
                            end="top top"
                            watch
                        >
                            <div className="o-wysiwyg">
                                <p>
                                    To allow multiple accordion items to expand
                                    at once, set the{' '}
                                    <strong>allowMultiple</strong> prop of the{' '}
                                    <strong>Accordion</strong> component.
                                </p>
                            </div>
                        </TranslateInOut>
                    </div>
                    <Accordion allowMultiple>
                        {items.map(({ header, content }, i) => (
                            <AccordionItem
                                header={header}
                                headingClassName="h6"
                                id={i}
                                key={i}
                                delay={0.3}
                                start="-100% bottom"
                                end="top top"
                                watch
                            >
                                <div className="o-wysiwyg">
                                    <p>{content}</p>
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
            <div className="u-spacing--responsive--bottom">
                <div className="o-container--small">
                    <ShuffleTextInOut delay={0.3} target="#expanded" watch>
                        <h2 id="expanded">Expanding items initially</h2>
                    </ShuffleTextInOut>
                    <TranslateInOut
                        delay={0.4}
                        y="100%"
                        start="-100% bottom"
                        end="top top"
                        watch
                    >
                        <div className="o-wysiwyg">
                            <p>
                                You could use the{' '}
                                <strong>initialExpanded</strong> prop of{' '}
                                <strong>AccordionItem</strong> to expand items
                                when accordion first mounts. In the following
                                example, the first item is expanded on mount.
                            </p>
                        </div>
                    </TranslateInOut>
                    <Accordion>
                        {items.map(({ header, content }, i) => (
                            <AccordionItem
                                header={header}
                                headingClassName="h6"
                                id={i}
                                key={i}
                                initialExpanded={i === 0 ? true : false}
                                delay={0.3}
                                start="-100% bottom"
                                end="top top"
                                watch
                            >
                                <div className="o-wysiwyg">
                                    <p>{content}</p>
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
            <div className="u-spacing--responsive--bottom">
                <div className="o-container--small">
                    <ShuffleTextInOut delay={0.3} target="#nested" watch>
                        <h2 id="nested">Nested accordion</h2>
                    </ShuffleTextInOut>
                    <TranslateInOut
                        delay={0.4}
                        y="100%"
                        start="-100% bottom"
                        end="top top"
                        watch
                    >
                        <div className="o-wysiwyg">
                            <p>
                                <strong>AccordionItem</strong> can have a nested
                                accordion
                            </p>
                        </div>
                    </TranslateInOut>
                    <Accordion>
                        {items.map(({ header }, i) => (
                            <AccordionItem
                                header={header}
                                headingClassName="h6"
                                id={i}
                                key={i}
                                delay={0.3}
                                start="-100% bottom"
                                end="top top"
                                watch
                            >
                                <Accordion>
                                    {items.map(({ header, content }, i) => (
                                        <AccordionItem
                                            header={header}
                                            headingTag={'h4'}
                                            headingClassName="h6"
                                            id={i}
                                            key={i}
                                        >
                                            <div className="o-wysiwyg">
                                                <p>{content}</p>
                                            </div>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps<{
    metaData: MetaDataProps;
}> = async () => {
    const metaData: MetaDataProps = {
        title: `Accordion | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    };

    return {
        props: {
            metaData,
        },
    };
};
