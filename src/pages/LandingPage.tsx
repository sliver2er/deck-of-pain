import { Post, Paragraph, Button } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";
import logo from "../assets/logo/logo.png";

interface LandingPageProps {
  onNext: () => void;
}

export function LandingPage({ onNext }: LandingPageProps) {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <Paragraph typography="t1" fontWeight="bold">
            <Paragraph.Text>고통의 카드팩</Paragraph.Text>
          </Paragraph>

          <Paragraph typography="t4" color={adaptive.grey500}>
            <Paragraph.Text>트럼프 카드로 홈트하기</Paragraph.Text>
          </Paragraph>
          <img src={logo} alt="logo" style={styles.icon} />
        </div>
        <Paragraph typography="t2" fontWeight="bold">
          <Paragraph.Text>고통의 카드팩이란?</Paragraph.Text>
        </Paragraph>
        <Post.Paragraph
          paddingBottom={24}
          aria-label={
            <>
              트럼프 카드를 이용한 재미있는 맨몸운동이예요.\n뽑은 트럼프
              카드의 문양에 따라\n \n - <b>스페이드</b>는 스쿼트,
              \n -<b>클로바</b>는 윗몸 일으키기, \n -
              <b>하트</b>는 버피, \n -<b>다이아몬드</b>
              는 푸쉬업을 수행해요. \n \n개수는
              <b>카드에 적힌 숫자</b>
              만큼 수행하고, \n총 13x4 = 52번의 세트를 수행하는 운동
              방식이예요.
            </>
          }
        >
          <Paragraph.Text>
            트럼프 카드를 이용한 재미있는 맨몸운동이예요.
            <br />
            뽑은 트럼프 카드의 문양에 따라
            <br />
            <br />-<b>스페이드</b>
            는 스쿼트,
            <br />-<b>클로바</b>
            는 윗몸 일으키기,
            <br />-<b>하트</b>
            는 버피,
            <br />-<b>다이아몬드</b>
            는 푸쉬업을 수행해요.
            <br />
            <br />
            개수는
            <b>카드에 적힌 숫자</b>
            만큼 수행하고,
            <br />총 13x4 = 52번의 세트를 수행해요.
          </Paragraph.Text>
        </Post.Paragraph>

        <div style={styles.ruleBox}>
          <Paragraph typography="st6" color={adaptive.grey600}>
            <Paragraph.Text>뽑은 카드 숫자만큼 운동해요</Paragraph.Text>
          </Paragraph>
        </div>
      </div>

      <div style={styles.bottomCTA}>
        <Button
          size="xlarge"
          variant="fill"
          color="primary"
          display="block"
          onClick={onNext}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    backgroundColor: adaptive.background,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    padding: "48px 24px",
    paddingBottom: "120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: "16px",
    gap: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    width: "132px",
    height: "132px",
    borderRadius: "20px",
    marginBottom: "20px",
  },
  ruleBox: {
    textAlign: "center",
  },
  bottomCTA: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "12px 20px 34px",
    backgroundColor: adaptive.background,
  },
};
