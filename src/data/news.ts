import { NewsItem } from "@/types/news";

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "OpenAI Just Dropped Its Most Powerful AI Yet",
    summary: [
      "오픈AI, 역대 최강 AI 모델 GPT-5 공개",
      "추론 능력 대폭 향상 — 복잡한 문제도 처리 가능",
      "AI가 일자리에 미칠 영향 놓고 논의 뜨거워",
    ],
    keywords: ["GPT-5", "AI Safety", "Microsoft", "Benchmark"],
    whyItMatters: [
      "Writing, coding, research jobs could change fast",
      "Improving faster than anyone predicted",
      "Microsoft is putting it in everything — you'll see it soon",
    ],
    sayIt: {
      A1: [
        { text: "OpenAI made a new AI.", highlight: null },
        { text: "The AI can write and answer questions.", highlight: { phrase: "answer questions", meaning: "질문에 답하다" } },
        { text: "It is better than the old one.", highlight: null },
        { text: "Some people are excited.", highlight: null },
        { text: "Some people are worried about their jobs.", highlight: { phrase: "worried about their jobs", meaning: "직업을 잃을까봐 걱정하다" } },
      ],
      B1: [
        { text: "OpenAI just put out a new AI, and people are saying it's a big deal.", highlight: { phrase: "a big deal", meaning: "중요한 일, 큰 사건" } },
        { text: "It's way better than the last version — it can write, think, even help with coding.", highlight: null },
        { text: "People are starting to wonder what this means for their jobs.", highlight: { phrase: "what this means for", meaning: "~에 어떤 영향을 미칠지" } },
        { text: "Microsoft has put a lot of money into OpenAI, so they're already jumping on it.", highlight: { phrase: "jumping on it", meaning: "재빠르게 활용하다" } },
        { text: "The real question is — does this make life easier, or just more complicated?", highlight: null },
      ],
      B2: [
        { text: "So OpenAI dropped GPT-5, and people who've tried it are saying it's a genuinely big step up.", highlight: { phrase: "a big step up", meaning: "확실히 한 단계 도약한 것" } },
        { text: "It handles complicated multi-step problems in a way that kind of feels more human.", highlight: null },
        { text: "The part that gets people talking is the pace — it feels like every six months the ceiling just goes up again.", highlight: { phrase: "gets people talking", meaning: "사람들의 화제가 되다" } },
        { text: "Microsoft is obviously going all in since they've bet so much on OpenAI.", highlight: { phrase: "going all in", meaning: "전력을 다해 밀어붙이다" } },
        { text: "Whether you're excited or nervous about it probably depends on what your job looks like right now.", highlight: null },
      ],
      C1: [
        { text: "GPT-5 is out, and the honest reaction from people who've tested it is — yeah, this one's different.", highlight: { phrase: "this one's different", meaning: "이번엔 진짜 다르다는 뉘앙스" } },
        { text: "What I find more interesting than the benchmarks is where the ceiling actually is.", highlight: { phrase: "where the ceiling actually is", meaning: "실제 한계가 어디인지" } },
        { text: "Microsoft is deep enough into this that they pretty much have to keep going.", highlight: null },
        { text: "The safety conversation is getting louder, but it still feels like it's lagging behind the capability conversation.", highlight: { phrase: "lagging behind", meaning: "뒤처지다, 따라가지 못하다" } },
        { text: "The real disruption isn't going to be some dramatic moment — it's going to be a slow creep.", highlight: { phrase: "a slow creep", meaning: "서서히 스며드는 변화" } },
      ],
    },
  },
  {
    id: "2",
    title: "The US Is Slapping Big Tariffs on Imports — Here's What It Means",
    summary: [
      "미국, 수입품에 대규모 관세 전격 시행",
      "중국·EU, 보복 관세로 맞대응 예고",
      "무역 갈등 고조 — 경제 불확실성 확대",
    ],
    keywords: ["Tariff", "Trade War", "Supply Chain"],
    whyItMatters: [
      "Electronics, food, clothes — prices going up",
      "Trade war could hurt economies on both sides",
      "Lower-income households hit hardest",
    ],
    sayIt: {
      A1: [
        { text: "The US now has new taxes on things from other countries.", highlight: { phrase: "taxes on things from other countries", meaning: "수입품에 붙는 세금 = 관세" } },
        { text: "These taxes are called tariffs.", highlight: null },
        { text: "They make imported products cost more money.", highlight: null },
        { text: "Other countries are angry about this.", highlight: null },
        { text: "It could make shopping more expensive for everyone.", highlight: { phrase: "more expensive for everyone", meaning: "모든 사람에게 더 비싸지다" } },
      ],
      B1: [
        { text: "The US just put big new taxes on imported goods.", highlight: { phrase: "imported goods", meaning: "수입품" } },
        { text: "The idea is to protect American workers from cheaper foreign competition.", highlight: { phrase: "foreign competition", meaning: "외국 경쟁 업체" } },
        { text: "But when it costs more to import things, companies just raise prices for us.", highlight: { phrase: "raise prices", meaning: "가격을 올리다" } },
        { text: "China and Europe are already talking about hitting back with their own taxes.", highlight: { phrase: "hitting back", meaning: "보복하다, 맞받아치다" } },
        { text: "It could turn into one of those situations where everyone ends up losing.", highlight: { phrase: "ends up losing", meaning: "결국 손해를 보다" } },
      ],
      B2: [
        { text: "The US slapped a bunch of new tariffs on imported goods, and the short version is — expect prices to go up.", highlight: { phrase: "the short version is", meaning: "간단히 말하면" } },
        { text: "The government's argument is that it protects American manufacturers who've been undercut by cheaper imports.", highlight: { phrase: "undercut by", meaning: "~에 의해 가격 경쟁에서 밀리다" } },
        { text: "But here's the problem: when it costs more to bring in materials, companies don't eat that cost — we do.", highlight: { phrase: "eat that cost", meaning: "그 비용을 감수하다, 손해를 떠안다" } },
        { text: "China and the EU are already talking about hitting back, so this could pretty easily turn into a full trade war.", highlight: null },
        { text: "It might score political points in the short term, but regular shoppers are going to feel it before the big companies do.", highlight: { phrase: "score political points", meaning: "정치적으로 유리한 점수를 따다" } },
      ],
      C1: [
        { text: "What's notable about this round is the scale — it's not targeted, it's broad, which makes the knock-on effects hard to predict.", highlight: { phrase: "knock-on effects", meaning: "연쇄적으로 발생하는 부작용" } },
        { text: "The 'protect American manufacturing' argument has real merit in specific sectors, but sweeping tariffs hurt industries that depend on imported inputs just as much.", highlight: { phrase: "sweeping tariffs", meaning: "광범위하게 적용되는 관세" } },
        { text: "The retaliation piece is what worries me most — China and the EU don't really have an incentive to back down.", highlight: { phrase: "back down", meaning: "물러서다, 양보하다" } },
        { text: "The people who feel it first aren't going to be corporations — it's going to be lower-income households.", highlight: null },
        { text: "The political logic is obvious, but history is pretty clear that these things are a lot easier to start than to walk back.", highlight: { phrase: "walk back", meaning: "(정책·발언을) 철회하다" } },
      ],
    },
  },
  {
    id: "3",
    title: "World Leaders Agree to Cut Emissions — But Is It Enough?",
    summary: [
      "주요국, 10년간 탄소 감축 기후 협약 서명",
      "과학자들 \"목표치 부족, 1.5도 억제 어렵다\"",
      "실질적 이행 의지와 정책 수립이 관건",
    ],
    keywords: ["Net Zero", "Climate Target", "Fossil Fuels", "G20"],
    whyItMatters: [
      "Without bigger cuts, extreme weather only gets worse",
      "Countries often sign deals and don't follow through",
      "Fossil fuel industry is still defining what 'net zero' means",
    ],
    sayIt: {
      A1: [
        { text: "World leaders met to talk about climate change.", highlight: { phrase: "climate change", meaning: "기후 변화" } },
        { text: "They made a plan to create less pollution.", highlight: null },
        { text: "Many countries agreed to the plan.", highlight: null },
        { text: "But some people say it is not enough.", highlight: null },
        { text: "Climate change is still a big problem.", highlight: null },
      ],
      B1: [
        { text: "World leaders just agreed on a new deal to cut pollution over the next decade.", highlight: { phrase: "cut pollution", meaning: "오염을 줄이다" } },
        { text: "Getting this many countries to agree is actually harder than it sounds.", highlight: { phrase: "harder than it sounds", meaning: "들리는 것보다 훨씬 어렵다" } },
        { text: "But scientists say the cuts aren't big enough to stop things from getting really bad.", highlight: null },
        { text: "Countries don't always follow through on these promises — that's happened before.", highlight: { phrase: "follow through on", meaning: "(약속·계획을) 끝까지 실행하다" } },
        { text: "It's a step forward, but I wouldn't call it a solution yet.", highlight: { phrase: "a step forward", meaning: "진전, 나아가는 발걸음" } },
      ],
      B2: [
        { text: "World leaders just signed another climate deal, and the good news is it's genuinely more ambitious than the last few.", highlight: { phrase: "more ambitious", meaning: "더 목표치가 높은, 더 과감한" } },
        { text: "Getting this many big economies on the same page is hard, so credit where it's due.", highlight: { phrase: "credit where it's due", meaning: "인정할 건 인정해야지" } },
        { text: "But scientists keep saying the numbers still aren't anywhere close to what we'd need to stay under 1.5 degrees.", highlight: { phrase: "anywhere close to", meaning: "~에 근접하지도 않다" } },
        { text: "There's always this gap between what countries promise at these summits and what they actually do when they get home.", highlight: { phrase: "when they get home", meaning: "정상회의 끝나고 돌아가서 (실제로는)" } },
        { text: "So I'd say cautiously optimistic, but mostly cautious — the hard part is what happens after the cameras go away.", highlight: { phrase: "after the cameras go away", meaning: "관심이 사라지고 나서" } },
      ],
      C1: [
        { text: "The deal is more substantive than recent ones, and it actually has some accountability language built in, which is new.", highlight: { phrase: "accountability language", meaning: "이행 책임을 명시하는 문구" } },
        { text: "Every time these summits happen, the same tension plays out: the science says move fast, and politics moves at its own pace.", highlight: { phrase: "plays out", meaning: "(같은 상황이) 반복해서 펼쳐지다" } },
        { text: "What's genuinely frustrating is the gap between what gets signed and what countries actually put into law when they go home.", highlight: { phrase: "put into law", meaning: "법으로 만들다, 입법화하다" } },
        { text: "The fossil fuel industry's fingerprints are all over how 'net zero' gets defined, and it's deliberately vague.", highlight: { phrase: "fingerprints are all over", meaning: "~의 흔적이 곳곳에 배어 있다" } },
        { text: "These agreements matter less for what they commit countries to and more for the political pressure they create.", highlight: { phrase: "commit countries to", meaning: "국가들을 ~에 구속하다, 약속하게 만들다" } },
      ],
    },
  },
];
