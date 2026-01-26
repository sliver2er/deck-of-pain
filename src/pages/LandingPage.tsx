import { Stepper, StepperRow, Paragraph, Button } from "@toss/tds-mobile";
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
        <Stepper staggerDelay={0.4}>
          <StepperRow
            left={<StepperRow.NumberIcon number={1} />}
            center={
              <Paragraph typography="t3" fontWeight="semibold">
                <Paragraph.Text>카드를 한 장 뽑아요</Paragraph.Text>
              </Paragraph>
            }
          />
          <StepperRow
            left={<StepperRow.NumberIcon number={2} />}
            center={
              <Paragraph typography="t3" fontWeight="semibold">
                <Paragraph.Text>문양에 맞는 운동을 확인해요</Paragraph.Text>
              </Paragraph>
            }
          />
          <StepperRow
            left={<StepperRow.NumberIcon number={3} />}
            center={
              <Paragraph typography="t3" fontWeight="semibold">
                <Paragraph.Text>카드의 숫자만큼 운동해요</Paragraph.Text>
              </Paragraph>
            }
          />
          <StepperRow
            left={<StepperRow.NumberIcon number={4} />}
            center={
              <Paragraph typography="t3" fontWeight="semibold">
                <Paragraph.Text>52장 반복하면 끝나요</Paragraph.Text>
              </Paragraph>
            }
            hideLine
          />
        </Stepper>
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
    marginBottom: "24px",
    gap: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    width: "160px",
    height: "160px",
    borderRadius: "20px",
    marginTop: "20px",
    marginBottom: "16px",
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
