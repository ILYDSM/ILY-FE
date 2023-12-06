import { createGroup, editGroup } from '@/apis/meet';
import Category from '@/components/common/Category';
import CustomButton from '@/components/common/CustomButton';
import CustomInput from '@/components/common/CustomInput';
import CustomSwitch from '@/components/common/CustomSwitch';
import TitleBar from '@/components/common/TitleBar';
import { platte } from '@/styles/platte';
import { getItem } from '@/utils/AsyncStorage';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { interestType } from '@/utils/Translates';

const CreateGroup = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [categories, setCategories] = useState<InterestEnglishType[]>([]);
  const [isLimit, setIsLimit] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [groupType, setGroupType] = useState<string>('');
  const [meetID, setMeetId] = useState<string>('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
      personnel: '',
    },
  });

  const onSubmit = async (data: any) => {
    if(groupType === 'edit') {
      await editGroup({ ...data, type: categories }, meetID);
      navigation.goBack();
    } else {
      await createGroup({ ...data, type: categories });
      navigation.goBack();
    }
  };

  const getData = async () => {
    const type = await getItem('groupType');
    const dataJSON = await getItem('groupData');

    if(type) {
      setGroupType(type)
    }

    if(dataJSON) {
      const data: ViewDetailResponse = JSON.parse(dataJSON);
      setValue('title', data.title);
      setValue('content', data.meet_content);
      setCategories(data.type);
      setMeetId(data.meet_id.toString())
      if(Number(data.personnel) < 9999) {
        setValue('personnel', `${data.personnel || 0}`);
        setIsLimit(true);
      }
    }

    return;
  }

  useEffect(() => {
    const dataFn = navigation.addListener('focus', () => {
      getData();
    });
    return dataFn;
  }, [navigation]);
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <TitleBar title={ groupType === "edit" ? "모임 수정하기" : "새 모임 만들기" } onPress={() => navigation.goBack()} />
          <View style={{ flex: 1, width: '100%', paddingHorizontal: 16, gap: 20 }}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: '이름은 필수입니다' },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  onChangeText={onChange}
                  value={value}
                  isError={!!errors.title}
                  description={errors.title?.message}
                  text="이름"
                />
              )}
              name="title"
            />
            <View style={{ gap: 8 }}>
              <CustomSwitch
                text="최대 인원 제한"
                onValueChange={() => {
                  setIsLimit(!isLimit);
                  reset((prev) => ({ ...prev, personnel: '' }));
                }}
                value={isLimit}
              />
              <Controller
                control={control}
                rules={{
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    message: '숫자만 입력할 수 있습니다',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    text="인원 제한"
                    editable={isLimit}
                    icon={<Text style={styles.unit}>명</Text>}
                    value={value}
                    isError={!!errors.personnel}
                    description={errors.personnel?.message}
                    onChangeText={onChange}
                  />
                )}
                name="personnel"
              />
            </View>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: '내용은 필수입니다' },
                maxLength: { value: 32, message: '최대 32자 입니다' },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  onChangeText={onChange}
                  isError={!!errors.content}
                  value={value}
                  text="설명"
                  description={
                    !!errors.content
                      ? errors.content.message
                      : `모임을 설명할 수 있는 간단한 소갯말을 작성해 주세요\n32자까지 작성할 수 있어요`
                  }
                />
              )}
              name="content"
            />
            <View>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  columnGap: 8,
                }}
              >
                {Object.entries(interestType).map((interest, index) => {
                  return (
                    <Category
                      key={index}
                      clicked={categories.includes(interest[1])}
                      text={interest[0]}
                      onPress={() =>
                        setCategories(
                          categories.includes(interest[1])
                            ? categories.filter((category) => category !== interest[1])
                            : [...categories, interest[1]],
                        )
                      }
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 16, paddingBottom: keyboardStatus ? 0 : 16 }}>
            <CustomButton title="→ 다음" onPress={handleSubmit(onSubmit)} />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
};

export default CreateGroup;

const styles = StyleSheet.create({
  unit: {
    color: platte.gray10,
    fontSize: 16,
    fontFamily: '500',
  },
});
