const t = String.raw

export type ExamId = 'cap' | 'gsat' | 'ast'
export type Difficulty = 1 | 2 | 3

export interface SolutionStep {
  title: string
  body: string
}

export interface Problem {
  id: string
  exam: ExamId
  topic: string
  difficulty: Difficulty
  source: string
  statement: string
  answer: string
  steps: SolutionStep[]
}

export interface ExamMeta {
  id: ExamId
  name: string
  short: string
  english: string
  subject: string
  nextDate: string
  description: string
}

export interface TimelineItem {
  label: string
  date: string
  note: string
}

export interface ScoreTable {
  title: string
  headers: string[]
  rows: string[][]
  note: string
}

export interface InfoCard {
  title: string
  body: string
}

export interface QuotaItem {
  label: string
  value: string
  description: string
}

export interface AdmissionInfo {
  timeline: TimelineItem[]
  scoreTable: ScoreTable
  strategies: InfoCard[]
  quotas: QuotaItem[]
}

export const EXAMS: ExamMeta[] = [
  {
    id: 'cap',
    name: '國中會考',
    short: '會考',
    english: 'CAP / JHET',
    subject: '數學（含非選擇題）',
    nextDate: '116 年 5 月 15 - 16 日',
    description: '國三升學關鍵，數學以精熟、基礎、待加強三等級呈現。',
  },
  {
    id: 'gsat',
    name: '高中學測',
    short: '學測',
    english: 'GSAT',
    subject: '數學 A／數學 B',
    nextDate: '116 年 1 月 22 - 24 日',
    description: '繁星推薦與個人申請的門票，成績以 15 級分計。',
  },
  {
    id: 'ast',
    name: '分科測驗',
    short: '分科',
    english: 'AST',
    subject: '數學甲',
    nextDate: '116 年 7 月 10 - 11 日',
    description: '分發入學主要依據，各科以 60 級分呈現。',
  },
]

export const PROBLEMS: Problem[] = [
  {
    id: 'cap-1',
    exam: 'cap',
    topic: '代數',
    difficulty: 1,
    source: '會考模擬題',
    statement: t`解一元二次方程式 $x^2 - 5x + 6 = 0$。`,
    answer: t`$x = 2$ 或 $x = 3$`,
    steps: [
      { title: '觀察常數項與一次項', body: t`找兩數相乘為 $6$、相加為 $-5$，可得 $-2$ 與 $-3$。` },
      { title: '十字交乘因式分解', body: t`$$x^2 - 5x + 6 = (x-2)(x-3) = 0$$` },
      { title: '令各因式為零', body: t`$x - 2 = 0$ 或 $x - 3 = 0$，故 $x = 2$ 或 $x = 3$。` },
    ],
  },
  {
    id: 'cap-2',
    exam: 'cap',
    topic: '幾何',
    difficulty: 2,
    source: '會考模擬題',
    statement: t`直角三角形 $ABC$ 中，$\angle C = 90^\circ$，$\overline{AC} = 6$，$\overline{BC} = 8$，求斜邊 $\overline{AB}$ 上的高。`,
    answer: t`$\dfrac{24}{5} = 4.8$`,
    steps: [
      { title: '畢氏定理求斜邊', body: t`$$\overline{AB} = \sqrt{6^2 + 8^2} = \sqrt{100} = 10$$` },
      { title: '同一個三角形面積算兩次', body: t`以兩股為底與高：$\dfrac{1}{2}\cdot 6 \cdot 8 = 24$；以斜邊為底：$\dfrac{1}{2}\cdot 10 \cdot h$。` },
      { title: '解出高', body: t`$$5h = 24 \Rightarrow h = \frac{24}{5} = 4.8$$` },
    ],
  },
  {
    id: 'cap-3',
    exam: 'cap',
    topic: '機率統計',
    difficulty: 1,
    source: '會考模擬題',
    statement: t`同時擲兩顆公正的骰子，求點數和為 $7$ 的機率。`,
    answer: t`$\dfrac{1}{6}$`,
    steps: [
      { title: '計算樣本空間', body: t`每顆骰子 $6$ 種結果，共 $6 \times 6 = 36$ 種等可能結果。` },
      { title: '列出有利事件', body: t`$(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$，共 $6$ 種。` },
      { title: '求機率', body: t`$$P = \frac{6}{36} = \frac{1}{6}$$` },
    ],
  },
  {
    id: 'cap-4',
    exam: 'cap',
    topic: '函數',
    difficulty: 2,
    source: '會考模擬題',
    statement: t`求二次函數 $y = x^2 - 4x + 1$ 圖形的頂點坐標。`,
    answer: t`$(2,\,-3)$`,
    steps: [
      { title: '配方', body: t`$$y = (x^2 - 4x + 4) - 4 + 1 = (x-2)^2 - 3$$` },
      { title: '對照頂點式', body: t`頂點式 $y = a(x-h)^2 + k$ 的頂點為 $(h, k)$。` },
      { title: '得出頂點', body: t`$h = 2$、$k = -3$，頂點為 $(2, -3)$。` },
    ],
  },
  {
    id: 'cap-5',
    exam: 'cap',
    topic: '數列級數',
    difficulty: 2,
    source: '會考模擬題',
    statement: t`等差數列首項 $a_1 = 3$、公差 $d = 4$，求第 $20$ 項 $a_{20}$ 與前 $20$ 項和 $S_{20}$。`,
    answer: t`$a_{20} = 79$，$S_{20} = 820$`,
    steps: [
      { title: '一般項公式', body: t`$$a_n = a_1 + (n-1)d \Rightarrow a_{20} = 3 + 19 \times 4 = 79$$` },
      { title: '等差級數公式', body: t`$$S_n = \frac{n(a_1 + a_n)}{2}$$` },
      { title: '代入計算', body: t`$$S_{20} = \frac{20(3 + 79)}{2} = 820$$` },
    ],
  },
  {
    id: 'cap-6',
    exam: 'cap',
    topic: '幾何',
    difficulty: 2,
    source: '會考模擬題',
    statement: t`圓 $O$ 的半徑為 $5$，弦 $\overline{AB} = 8$，求圓心 $O$ 到弦 $\overline{AB}$ 的距離。`,
    answer: t`$3$`,
    steps: [
      { title: '圓心到弦的垂線平分弦', body: t`作 $\overline{OM} \perp \overline{AB}$，則 $\overline{AM} = 4$。` },
      { title: '在直角三角形 $OAM$ 中', body: t`斜邊 $\overline{OA} = 5$（半徑），一股 $\overline{AM} = 4$。` },
      { title: '畢氏定理', body: t`$$\overline{OM} = \sqrt{5^2 - 4^2} = 3$$` },
    ],
  },
  {
    id: 'gsat-1',
    exam: 'gsat',
    topic: '指數對數',
    difficulty: 2,
    source: '學測模擬題',
    statement: t`解方程式 $\log_2(x+1) + \log_2(x-1) = 3$。`,
    answer: t`$x = 3$`,
    steps: [
      { title: '先確認定義域', body: t`真數須為正：$x + 1 > 0$ 且 $x - 1 > 0$，故 $x > 1$。` },
      { title: '對數合併', body: t`$$\log_2\big[(x+1)(x-1)\big] = 3 \Rightarrow x^2 - 1 = 2^3 = 8$$` },
      { title: '解方程並檢驗', body: t`$x^2 = 9 \Rightarrow x = \pm 3$，依定義域只取 $x = 3$。` },
    ],
  },
  {
    id: 'gsat-2',
    exam: 'gsat',
    topic: '三角函數',
    difficulty: 2,
    source: '學測模擬題',
    statement: t`已知 $\sin\theta + \cos\theta = \dfrac{1}{2}$，求 $\sin 2\theta$ 的值。`,
    answer: t`$-\dfrac{3}{4}$`,
    steps: [
      { title: '兩邊平方', body: t`$$(\sin\theta + \cos\theta)^2 = \frac{1}{4}$$` },
      { title: '展開並使用平方關係', body: t`$\sin^2\theta + \cos^2\theta + 2\sin\theta\cos\theta = 1 + \sin 2\theta$` },
      { title: '解出', body: t`$$1 + \sin 2\theta = \frac{1}{4} \Rightarrow \sin 2\theta = -\frac{3}{4}$$` },
    ],
  },
  {
    id: 'gsat-3',
    exam: 'gsat',
    topic: '機率統計',
    difficulty: 1,
    source: '學測模擬題',
    statement: t`袋中有 $3$ 顆紅球、$2$ 顆白球，自袋中隨機取出 $2$ 球（不放回），求恰為 $1$ 紅 $1$ 白的機率。`,
    answer: t`$\dfrac{3}{5}$`,
    steps: [
      { title: '樣本空間', body: t`$$\binom{5}{2} = 10$$` },
      { title: '有利事件', body: t`$$\binom{3}{1}\binom{2}{1} = 3 \times 2 = 6$$` },
      { title: '求機率', body: t`$$P = \frac{6}{10} = \frac{3}{5}$$` },
    ],
  },
  {
    id: 'gsat-4',
    exam: 'gsat',
    topic: '向量',
    difficulty: 2,
    source: '學測模擬題',
    statement: t`設 $\vec{a} = (1, 2)$、$\vec{b} = (3, -1)$，求 $\vec{a}$ 與 $\vec{b}$ 夾角 $\theta$ 的 $\cos\theta$。`,
    answer: t`$\dfrac{\sqrt{2}}{10}$`,
    steps: [
      { title: '計算內積', body: t`$$\vec{a}\cdot\vec{b} = 1 \cdot 3 + 2 \cdot (-1) = 1$$` },
      { title: '計算長度', body: t`$|\vec{a}| = \sqrt{5}$，$|\vec{b}| = \sqrt{10}$。` },
      { title: '套用夾角公式', body: t`$$\cos\theta = \frac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|} = \frac{1}{\sqrt{50}} = \frac{\sqrt{2}}{10}$$` },
    ],
  },
  {
    id: 'gsat-5',
    exam: 'gsat',
    topic: '三角函數',
    difficulty: 3,
    source: '學測模擬題',
    statement: t`$\triangle ABC$ 三邊長 $a = 7$、$b = 5$、$c = 3$，求最大內角的度數與 $\triangle ABC$ 的面積。`,
    answer: t`$\angle A = 120^\circ$，面積 $\dfrac{15\sqrt{3}}{4}$`,
    steps: [
      { title: '大邊對大角', body: t`最長邊為 $a = 7$，所以最大角為 $\angle A$。` },
      { title: '餘弦定理', body: t`$$\cos A = \frac{b^2 + c^2 - a^2}{2bc} = \frac{25 + 9 - 49}{30} = -\frac{1}{2}$$ 故 $\angle A = 120^\circ$。` },
      { title: '面積公式', body: t`$$\text{面積} = \frac{1}{2}bc\sin A = \frac{1}{2}\cdot 5 \cdot 3 \cdot \frac{\sqrt{3}}{2} = \frac{15\sqrt{3}}{4}$$` },
    ],
  },
  {
    id: 'gsat-6',
    exam: 'gsat',
    topic: '指數對數',
    difficulty: 2,
    source: '學測模擬題',
    statement: t`已知 $\log 2 \approx 0.3010$，求 $2^{50}$ 是幾位數。`,
    answer: t`$16$ 位數`,
    steps: [
      { title: '取常用對數', body: t`$$\log 2^{50} = 50 \log 2 \approx 15.05$$` },
      { title: '判讀首數', body: t`首數為 $15$，表示 $10^{15} \le 2^{50} < 10^{16}$。` },
      { title: '得出位數', body: t`首數 $+1$，所以 $2^{50}$ 為 $16$ 位數。` },
    ],
  },
  {
    id: 'ast-1',
    exam: 'ast',
    topic: '微積分',
    difficulty: 2,
    source: '分科模擬題',
    statement: t`求函數 $f(x) = x^3 - 3x^2 + 2$ 的極大值與極小值。`,
    answer: t`極大值 $f(0) = 2$，極小值 $f(2) = -2$`,
    steps: [
      { title: '求導函數', body: t`$$f'(x) = 3x^2 - 6x = 3x(x - 2)$$` },
      { title: '找臨界點並判斷變號', body: t`$f'(x) = 0 \Rightarrow x = 0$ 或 $x = 2$。$f'$ 在 $x=0$ 由正變負、在 $x=2$ 由負變正。` },
      { title: '代回求值', body: t`極大值 $f(0) = 2$；極小值 $f(2) = 8 - 12 + 2 = -2$。` },
    ],
  },
  {
    id: 'ast-2',
    exam: 'ast',
    topic: '微積分',
    difficulty: 1,
    source: '分科模擬題',
    statement: t`計算定積分 $\displaystyle\int_0^2 (3x^2 - 2x)\,dx$。`,
    answer: t`$4$`,
    steps: [
      { title: '求反導函數', body: t`$$\int (3x^2 - 2x)\,dx = x^3 - x^2 + C$$` },
      { title: '套用微積分基本定理', body: t`$$\Big[x^3 - x^2\Big]_0^2 = (8 - 4) - 0$$` },
      { title: '得出結果', body: t`積分值為 $4$。` },
    ],
  },
  {
    id: 'ast-3',
    exam: 'ast',
    topic: '複數',
    difficulty: 2,
    source: '分科模擬題',
    statement: t`求 $(1 + i)^{10}$ 的值。`,
    answer: t`$32i$`,
    steps: [
      { title: '化為極式', body: t`$$1 + i = \sqrt{2}\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right)$$` },
      { title: '棣美弗定理', body: t`$$(1+i)^{10} = (\sqrt{2})^{10}\left(\cos\frac{10\pi}{4} + i\sin\frac{10\pi}{4}\right) = 32\left(\cos\frac{5\pi}{2} + i\sin\frac{5\pi}{2}\right)$$` },
      { title: '化簡', body: t`$\cos\frac{5\pi}{2} = 0$、$\sin\frac{5\pi}{2} = 1$，所以結果為 $32i$。` },
    ],
  },
  {
    id: 'ast-4',
    exam: 'ast',
    topic: '機率統計',
    difficulty: 1,
    source: '分科模擬題',
    statement: t`某選手投籃命中率為 $0.6$，獨立投籃 $5$ 次，令 $X$ 為命中次數，求 $E(X)$ 與 $\mathrm{Var}(X)$。`,
    answer: t`$E(X) = 3$，$\mathrm{Var}(X) = 1.2$`,
    steps: [
      { title: '辨識分布', body: t`$X \sim B(n, p)$，其中 $n = 5$、$p = 0.6$。` },
      { title: '期望值', body: t`$$E(X) = np = 5 \times 0.6 = 3$$` },
      { title: '變異數', body: t`$$\mathrm{Var}(X) = np(1-p) = 5 \times 0.6 \times 0.4 = 1.2$$` },
    ],
  },
  {
    id: 'ast-5',
    exam: 'ast',
    topic: '微積分',
    difficulty: 3,
    source: '分科模擬題',
    statement: t`求曲線 $y = x^2$ 與直線 $y = 2x$ 所圍成區域的面積。`,
    answer: t`$\dfrac{4}{3}$`,
    steps: [
      { title: '求交點', body: t`$x^2 = 2x \Rightarrow x = 0$ 或 $x = 2$。` },
      { title: '判斷上下函數', body: t`在 $0 < x < 2$ 時 $2x > x^2$，直線在上方。` },
      { title: '列式積分', body: t`$$\int_0^2 (2x - x^2)\,dx = \Big[x^2 - \frac{x^3}{3}\Big]_0^2 = 4 - \frac{8}{3} = \frac{4}{3}$$` },
    ],
  },
  {
    id: 'ast-6',
    exam: 'ast',
    topic: '微積分',
    difficulty: 1,
    source: '分科模擬題',
    statement: t`求極限 $\displaystyle\lim_{x \to 0} \frac{\sin 3x}{x}$。`,
    answer: t`$3$`,
    steps: [
      { title: '湊出基本極限型', body: t`$$\frac{\sin 3x}{x} = 3 \cdot \frac{\sin 3x}{3x}$$` },
      { title: '使用基本極限', body: t`當 $x \to 0$ 時 $3x \to 0$，且 $\displaystyle\lim_{u \to 0}\frac{\sin u}{u} = 1$。` },
      { title: '得出結果', body: t`極限值為 $3 \times 1 = 3$。` },
    ],
  },
]

export const ADMISSION: Record<ExamId, AdmissionInfo> = {
  cap: {
    timeline: [
      { label: '會考報名', date: '116 年 3 月中旬', note: '多由就讀國中集體報名' },
      { label: '國中教育會考', date: '116 年 5 月中旬', note: '連續兩日，數學含非選擇題' },
      { label: '成績公布', date: '116 年 6 月上旬', note: '公布各科等級與標示' },
      { label: '免試入學志願選填', date: '116 年 6 月中下旬', note: '依各就學區簡章辦理' },
      { label: '免試入學放榜', date: '116 年 7 月上旬', note: '未錄取者可參加續招' },
    ],
    scoreTable: {
      title: '會考數學等級與標示',
      headers: ['等級', '標示', '說明', '常見積分'],
      rows: [
        ['精熟', 'A++', '精熟等級中前 50%', '6 分'],
        ['精熟', 'A+', '精熟等級中前 50%–75%', '6 分'],
        ['精熟', 'A', '精熟等級中其餘考生', '6 分'],
        ['基礎', 'B++', '基礎等級中前 25%', '4 分'],
        ['基礎', 'B+', '基礎等級中前 25%–50%', '4 分'],
        ['基礎', 'B', '基礎等級中其餘考生', '4 分'],
        ['待加強', 'C', '尚未達基礎能力', '2 分'],
      ],
      note: '積分換算各就學區略有差異，標示（++ / +）多用於超額比序，請以當年度簡章為準。',
    },
    strategies: [
      { title: '先穩基礎題', body: '會考題目約七成屬基礎概念，先確保一元二次方程式、函數圖形、幾何證明的基本題型零失誤。' },
      { title: '練好數學寫作', body: '非選擇題重視推理過程，寫出關鍵步驟與理由比只寫答案更能拿到級分。' },
      { title: '用標示衝超額比序', body: '熱門志願常以 A++ / A+ 作為比序，數學是最容易拉開差距的科目。' },
    ],
    quotas: [
      { label: '免試入學', value: '約 9 成以上', description: '多數學生經由免試入學進入高中職' },
      { label: '特色招生', value: '少量名額', description: '部分學校辦理考試分發或甄選入學' },
      { label: '適性輔導', value: '依區域', description: '結合志願序、在校表現與會考成績' },
    ],
  },
  gsat: {
    timeline: [
      { label: '學測報名', date: '115 年 10 月下旬–11 月上旬', note: '於大考中心網站完成報名' },
      { label: '學科能力測驗', date: '116 年 1 月中旬（預定）', note: '數學 A 與數學 B 擇一或兩科' },
      { label: '成績公布', date: '116 年 2 月下旬', note: '各科 15 級分與五標' },
      { label: '繁星推薦', date: '116 年 3 月', note: '依在校成績比序' },
      { label: '個人申請放榜', date: '116 年 5 月中旬', note: '第二階段甄試後統一分發' },
    ],
    scoreTable: {
      title: '學測五標定義（15 級分制）',
      headers: ['標準', '百分位數', '代表意義', '級分示意（數 A）'],
      rows: [
        ['頂標', '第 88 百分位', '約前 12% 考生', '13'],
        ['前標', '第 75 百分位', '約前 25% 考生', '11'],
        ['均標', '第 50 百分位', '中位數水準', '8'],
        ['後標', '第 25 百分位', '約後 25% 考生', '5'],
        ['底標', '第 12 百分位', '約後 12% 考生', '4'],
      ],
      note: '級距 = 該科前 1% 考生平均原始分數 ÷ 15。級分示意僅供參考，實際五標以大考中心當年公告為準。',
    },
    strategies: [
      { title: '數 A 或數 B？', body: '理工、醫藥、商管多採計數 A；人文社會類校系多採計數 B。先查目標校系的採計科目再決定。' },
      { title: '檢定與倍率篩選', body: '個人申請第一階段會以檢定與倍率篩選，數學級分常是熱門校系的關鍵門檻。' },
      { title: '學習歷程同步準備', body: '第二階段審查重視學習歷程檔案，數學專題或探究實作可作為加分素材。' },
    ],
    quotas: [
      { label: '繁星推薦', value: '約 15%', description: '依在校學業成績百分比' },
      { label: '個人申請', value: '約 50%', description: '學測成績 + 學習歷程 + 甄試' },
      { label: '分發入學', value: '約 35%', description: '含個人申請回流名額' },
    ],
  },
  ast: {
    timeline: [
      { label: '分科報名', date: '116 年 5 月', note: '可依目標校系選考科目' },
      { label: '分科測驗', date: '116 年 7 月中旬（預定）', note: '數學甲為唯一數學考科' },
      { label: '成績公布', date: '116 年 7 月下旬', note: '各科 60 級分與五標' },
      { label: '登記分發志願選填', date: '116 年 7 月底–8 月初', note: '最多可填寫上百個志願' },
      { label: '分發入學放榜', date: '116 年 8 月上中旬', note: '依志願序與採計成績分發' },
    ],
    scoreTable: {
      title: '分科五標定義（60 級分制）',
      headers: ['標準', '百分位數', '代表意義', '級分示意（數甲）'],
      rows: [
        ['頂標', '第 88 百分位', '約前 12% 考生', '46'],
        ['前標', '第 75 百分位', '約前 25% 考生', '38'],
        ['均標', '第 50 百分位', '中位數水準', '24'],
        ['後標', '第 25 百分位', '約後 25% 考生', '12'],
        ['底標', '第 12 百分位', '約後 12% 考生', '7'],
      ],
      note: '分科測驗各科成績轉換為 0–60 級分。級分示意僅供參考，實際五標以大考中心當年公告為準。',
    },
    strategies: [
      { title: '數甲重微積分', body: '極限、導數、積分與面積應用是數甲必考核心，務必熟練圖形判讀與計算。' },
      { title: '注意加權倍數', body: '理工醫學系常將數甲加權 1.5～2 倍，數學每一級分都影響落點。' },
      { title: '志願序採計規則', body: '分發依志願序優先，先填理想校系、再放穩定志願，避免高分低就。' },
    ],
    quotas: [
      { label: '分發入學', value: '約 1/3', description: '大學總招生名額的重要管道' },
      { label: '回流名額', value: '依年度', description: '繁星、申請缺額回流至分發' },
      { label: '採計方式', value: '學測 + 分科', description: '部分校系可同時採計兩種成績' },
    ],
  },
}

export const TOPICS_BY_EXAM: Record<ExamId, string[]> = {
  cap: Array.from(new Set(PROBLEMS.filter((p) => p.exam === 'cap').map((p) => p.topic))),
  gsat: Array.from(new Set(PROBLEMS.filter((p) => p.exam === 'gsat').map((p) => p.topic))),
  ast: Array.from(new Set(PROBLEMS.filter((p) => p.exam === 'ast').map((p) => p.topic))),
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  1: '基礎',
  2: '進階',
  3: '挑戰',
}
