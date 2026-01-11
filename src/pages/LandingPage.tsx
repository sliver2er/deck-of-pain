import { Text, Button } from "@toss/tds-mobile";
import logo from "../assets/logo/logo.png";

interface LandingPageProps {
  onNext: () => void;
}

export function LandingPage({ onNext }: LandingPageProps) {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <Text typography="t1" fontWeight="bold">
            고통의 카드팩
          </Text>
          <br />
          <Text typography="t6" style={{ marginTop: 8, color: "#6B7684" }}>
            트럼프 카드로 홈트하기
          </Text>
        </div>

        <div style={styles.iconWrapper}>
          <img src={logo} alt="logo" style={styles.icon} />
        </div>

        <div style={styles.description}>
          <Text typography="t6" style={{ color: "#4E5968", lineHeight: 1.6 }}>
            트럼프 카드를 이용한 재미있는 맨몸운동이에요.
            <br />
            <br />
            뽑은 트럼프 카드의 문양에 따라
            <br />• <b>스페이드</b>는 스쿼트
            <br />• <b>클로버</b>는 싯업
            <br />• <b>하트</b>는 버피
            <br />• <b>다이아몬드</b>는 푸쉬업
            <br />
            <br />
            개수는 <b>카드에 적힌 숫자</b>만큼 수행하고,
            <br />총 52장의 카드를 모두 소진하면 완료!
          </Text>
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
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    padding: "40px 20px",
    paddingBottom: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  iconWrapper: {
    marginBottom: "32px",
  },
  icon: {
    width: "100px",
    height: "100px",
    borderRadius: "20px",
  },
  description: {
    textAlign: "center",
  },
  bottomCTA: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "12px 20px 34px",
    backgroundColor: "#ffffff",
  },
};
