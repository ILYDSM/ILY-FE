# ILY-FE

## 커밋 규칙
```
feat : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
fix : 기능에 대한 버그 수정
build : 빌드 관련 수정
chore : 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
ci : CI 관련 설정 수정
docs : 문서(주석) 수정
style : 코드 스타일, 포맷팅에 대한 수정
refactor : 기능의 변화가 아닌 코드 리팩터링 ex) 변수 이름 변경
test : 테스트 코드 추가/수정
release : 버전 릴리즈
```

## 브랜치 명명 규칙
```
feature/(이슈번호)-(스네이크 케이스로 작업명)
ex) feature/1-login-page
```

## 파일명
```
파일 이름은 PascalCase를 사용합니다. 용도에 따라 단수, 복수 취급합니다.
ex) File.tsx, Files.tsx
```

## 변수 & 함수명
```
변수명과 함수명은 CamelCase로 작성합니다.
ex) const variable:string = 'variableName'
const login = () => { }
```

## 폴더명
```
폴더 이름은 camelCase로 작성합니다. 복수 취급합니다.
ex) pages, components, hooks, utils
```

## Type & Interface명
```
Type과 Interface, Component의 이름은 PascalCase를 사용합니다.
ex) type TypeName
interface InterfaceName
ComponentName
```
