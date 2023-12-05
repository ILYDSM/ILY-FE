import { platte } from '@/styles/platte';
import { Image, Text, View } from 'react-native';

interface ReviewComponentProps {
  name: string;
  content: string;
  date: string;
}

export const ReviewComponent = ({ name, content, date }: ReviewComponentProps) => {
  return (
    <View style={{ padding: 8, gap: 4, borderRadius: 8, backgroundColor: platte.gray05 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3.5 }}>
        <Image
          style={{ width: 24, height: 24, borderRadius: 50, objectFit: 'cover' }}
          source={{
            uri: 'https://avatars.githubusercontent.com/u/143332497?s=200&v=4',
          }}
          alt="유저 사진"
        />
        <Text style={{ fontSize: 14, fontWeight: '500' }}>{name}</Text>
      </View>
      <Text style={{ fontSize: 14, fontWeight: '500' }}>{content}</Text>
      <Text style={{ fontSize: 12, fontWeight: '500', color: platte.gray50 }}>{date}</Text>
    </View>
  );
};
