const Wrapper = ({children}) =>
<div class="wrapper">
    {children}
</div>

const Header = ({children}) =>
<header class="header">
  {children}
</header>

const Header_logo = ({logo_src}) =>
<strong class="logo">
  <a class="logo" href="#">
      <img src={logo_src} alt="logo"/>
  </a>
</strong>

const Burger_menu = ({children}) =>
<div class="burger_menu">
    <a class="burger_menu__button" href="#">
        <span class="burger_menu__decoration"></span>
    </a>
    <Nav_list>
        {Nav_list_items}
    </Nav_list>
    <div class="burger_menu__overlay"></div>
</div>

const Nav_list = ({children}) =>
<nav class="burger_menu__nav">
  <ul class="nav_list">
    {children}
  </ul>
</nav>

// Try something new...
const nav_list_text = ["Item1", "Item2", "Item3", "Item4", "Item5"];
const Nav_list_items = nav_list_text.map((nav_list_text) =>
  <li>
    <a href="#">{nav_list_text}</a>
  </li>
);

const Content = ({children}) =>
<div class="content">
  {children}
</div>

const Main = ({children}) =>
<main class="main">
  <section class="section">
    {children}
  </section>
</main>

const Main_text = ({text, title}) =>
<div>
    <p>
        {text}
    </p>
    <h1>
        {title}
    </h1>
</div>

const Container_of_cards = ({children}) =>
<div class="container_of_cards">
    {children}
</div>

const Card = () =>
<div class="card">
    <div class="card_content">
        <div class="pic_holder">
            <img src="img/100.png" alt="" />
        </div>
        <h2>
            Lorem ipsum dolor sit amet.
        </h2>
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos ullam in explicabo exercitationem ab beatae excepturi fuga. Aperiam et sint, tempora nam consequatur repellendus velit, porro blanditiis, esse unde optio.
        </p>
    </div>
    <a href="#" class="button">Go</a>
</div>

// Repetition is the mother of learning...
const numbers = [1, 2, 3, 4, 5];
const Numbers_item = numbers.map( (numbers) =>
    <div class="item">
        {numbers}
    </div>
);

const Holder = () =>
<div class="holder">
    {Numbers_item}
</div>

const Aside1 = ({content}) =>
<aside class="aside_left">
  {content}
</aside>

const Aside2 = ({content}) =>
<aside class="aside_right">
  {content}
</aside>

const Footer = () =>
<footer>
  Footer
</footer>

function App() {
  return (
    <Wrapper>
        <Header>
            <Header_logo logo_src="img/logo.png" />
            <Burger_menu />
        </Header>
        <Content>
            <Main>
                <Main_text 
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia praesentium, ducimus, necessitatibus odio quisquam similique est doloribus at autem, numquam quos. Voluptatem praesentium id, quisquam dolorum labore illo minima? Reprehenderit?"
                    title="Our Work" 
                />
                <Container_of_cards>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </Container_of_cards>
                <Holder />
            </Main>
        <Aside1 content="Aside 1" />
        <Aside2 content="Aside 2" />
      </Content>
      <Footer />
    </Wrapper>
  );
}

export default App;
