import styled from "styled-components";

export const Root = styled.div`
  padding: 24px 50px;
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #0a0f1e 0%, #0f1729 100%);
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const Title = styled.div`
  color: #fff;
  font-family: "Mona Sans";
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const Intro = styled.div`
  color: #aeb9e1;
  font-size: 14px;
  line-height: 1.5;
`;

// 검색 영역
export const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

export const ModeSelector = styled.div`
  display: flex;
  gap: 12px;
`;

export const ModeButton = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
      : "#1f2937"};
  color: white;
  border: 2px solid ${(props) => (props.$active ? "#3b82f6" : "#374151")};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.$active
        ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
        : "#374151"};
    border-color: #3b82f6;
  }
`;

export const ChainSelect = styled.select`
  padding: 14px 18px;
  background: #1f2937;
  color: white;
  border: 2px solid #374151;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  min-width: 140px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  option {
    background: #1f2937;
    color: white;
  }
`;

export const AnalyzeButton = styled.button`
  padding: 14px 32px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const TestAddressHint = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 13px;
  color: #6b7280;
  margin-top: 8px;
`;

export const ErrorMessage = styled.div`
  padding: 16px 20px;
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  color: #fca5a5;
  font-size: 14px;
  margin-bottom: 24px;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #6b7280;
  font-size: 16px;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #9ca3af;
  font-size: 14px;
`;

// 그래프 + 사이드바 레이아웃
export const ContentLayout = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`;

export const GraphSection = styled.div<{ hasDetails: boolean }>`
  flex: ${(props) => (props.hasDetails ? "1" : "1")};
  transition: flex 0.3s ease;
`;

// 그래프 컨트롤 바
export const GraphControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 16px 20px;
  background: rgba(31, 41, 55, 0.8);
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

export const GraphInfo = styled.div`
  color: #9ca3af;
  font-size: 14px;
  font-weight: 600;
`;

export const GraphButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const ExpandButton = styled.button<{ primary?: boolean }>`
  position: relative;
  padding: 10px 24px;
  background: ${(props) =>
    props.primary
      ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
      : "rgba(59, 130, 246, 0.2)"};
  color: white;
  border: 2px solid ${(props) => (props.primary ? "#3b82f6" : "#374151")};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.primary
        ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
        : "rgba(59, 130, 246, 0.3)"};
    border-color: #3b82f6;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ButtonHint = styled.span`
  font-size: 10px;
  font-weight: 400;
  color: #cbd5e1;
  opacity: 0.8;
`;

// 사이드바 (노드 상세 정보)
export const DetailsSidebar = styled.div`
  width: 400px;
  min-width: 400px;
  max-height: 75vh;
  overflow-y: auto;
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(31, 41, 55, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.5);
    border-radius: 4px;

    &:hover {
      background: rgba(59, 130, 246, 0.7);
    }
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(59, 130, 246, 0.2);
`;

export const SidebarTitle = styled.h3`
  color: white;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  border: 2px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.3);
    border-color: #ef4444;
  }
`;

export const DetailSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DetailLabel = styled.div`
  color: #9ca3af;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

export const DetailValue = styled.div`
  color: #e5e7eb;
  font-size: 14px;
  line-height: 1.6;
`;

export const RiskScore = styled.div`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 8px;
`;

export const RiskLevel = styled.div`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const RiskTag = styled.span`
  padding: 6px 12px;
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

export const RuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RuleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: rgba(31, 41, 55, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  color: #e5e7eb;
  font-size: 13px;
`;

// 기존 컴포넌트 (호환성 유지)
export const CenterBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
