import { Link } from "react-router-dom";
import "./TheoryPage.css";

export const TheoryPage = () => {
  return (
    <div className="theoryPageContainer">
      <div className={"topBar"}>
        <h1>Теория оператора Собеля</h1>
        <Link to="/" className="theoryLink">
          ← Назад к приложению
        </Link>
      </div>

      <h2>1. Общая идея</h2>
      <p>
        Оператор Собеля — это метод выделения контуров на изображении. Он
        позволяет находить области резкого изменения яркости, то есть границы
        объектов.
      </p>
      <p>
        Контуры определяются через вычисление <b>градиента яркости</b>.
      </p>

      <h2>2. Преобразование в оттенки серого</h2>
      <p>Перед обработкой изображение переводится в градации серого:</p>

      <div className="formula">Gray = 0.299R + 0.587G + 0.114B</div>

      <p>Где R, G, B — цветовые компоненты пикселя.</p>

      <h2>3. Фильтры Собеля</h2>
      <p>Используются два фильтра:</p>
      <ul>
        <li>Gx — горизонтальные изменения</li>
        <li>Gy — вертикальные изменения</li>
      </ul>

      <div className="matrix">
        <div className="matrix-title">Gx</div>
        <div className="matrix-grid">
          <span>-1</span>
          <span>0</span>
          <span>1</span>
          <span>-2</span>
          <span>0</span>
          <span>2</span>
          <span>-1</span>
          <span>0</span>
          <span>1</span>
        </div>
      </div>

      <div className="matrix">
        <div className="matrix-title">Gy</div>
        <div className="matrix-grid">
          <span>-1</span>
          <span>-2</span>
          <span>-1</span>
          <span>0</span>
          <span>0</span>
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>1</span>
        </div>
      </div>

      <p>
        Центральные элементы имеют больший вес, поэтому центральный пиксель
        влияет сильнее.
      </p>

      <h2>4. Принцип работы</h2>
      <p>
        Для каждого пикселя берётся область 3×3. Значения умножаются на фильтр и
        суммируются.
      </p>

      <ul>
        <li>получаем Gx</li>
        <li>получаем Gy</li>
      </ul>

      <h2>5. Перемещение фильтра</h2>
      <p>Фильтр движется по изображению:</p>
      <ul>
        <li>слева направо</li>
        <li>затем сверху вниз</li>
      </ul>

      <p>Достигнув края, он возвращается влево и смещается вниз.</p>

      <h2>6. Градиент</h2>
      <p>Градиент показывает, насколько резко меняется яркость.</p>

      <div className="formula">G = √(Gx² + Gy²)</div>

      <p>Чем больше значение, тем сильнее выражен контур.</p>
      
      <div className="example">
        <h2>Пример вычисления (3×3)</h2>

        <div className="matrix">
          <div className="matrix-title">Исходное окно (яркости)</div>
          <div className="matrix-grid">
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
          </div>
        </div>

        <div className="matrix-calculation">
          <div className="matrix-title">Фильтр Gx</div>
          <div className="matrix-grid">
            <span>-1</span>
            <span>0</span>
            <span>1</span>
            <span>-2</span>
            <span>0</span>
            <span>2</span>
            <span>-1</span>
            <span>0</span>
            <span>1</span>
          </div>

          <div className="calculation">
            Gx = (10×-1 + 20×0 + 30×1) + (10×-2 + 20×0 + 30×2) + (10×-1 + 20×0 +
            30×1)
          </div>

          <div className="result">
            Gx = 20 + 40 + 20 = <b>80</b>
          </div>
        </div>

        <div className="matrix-calculation">
          <div className="matrix-title">Фильтр Gy</div>
          <div className="matrix-grid">
            <span>-1</span>
            <span>-2</span>
            <span>-1</span>
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>1</span>
          </div>

          <div className="calculation">
            Gy = (10×-1 + 20×-2 + 30×-1) + (10×0 + 20×0 + 30×0) + (10×1 + 20×2 +
            30×1)
          </div>

          <div className="result">
            Gy = -80 + 0 + 80 = <b>0</b>
          </div>
        </div>

        <div className="block result-block">
          <div className="block-title">Величина градиента</div>

          <div className="formula">G = √(80² + 0²)</div>

          <div className="result big">
            G = <b>80</b>
          </div>
        </div>
      </div>

      <h2>8. Пороговая обработка</h2>

      <div className="formula">Если G &lt; h → G = 0 Иначе → G = G</div>

      <p>Это убирает шум и оставляет только выраженные контуры.</p>

      <h2>9. Результат</h2>
      <p>После обработки:</p>
      <ul>
        <li>большие значения — светлые пиксели</li>
        <li>малые — тёмные</li>
      </ul>
    </div>
  );
};
