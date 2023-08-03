from rest_framework import serializers
from .models import Product, Order, OrderItem
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user_instance = User(**validated_data)
        user_instance.set_password(password)
        user_instance.save()
        return user_instance

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'date_ordered', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.date_ordered = validated_data.get(
            'date_ordered', instance.date_ordered)
        instance.save()

        items_data = validated_data.pop('items')
        item_ids = [item.get('id', None) for item in items_data]
        # remove items which are not included in the request
        instance.items.exclude(id__in=item_ids).delete()

        for item_data in items_data:
            item_id = item_data.pop('id', None)
            if item_id:  # update
                OrderItem.objects.filter(id=item_id).update(**item_data)
            else:  # create
                OrderItem.objects.create(order=instance, **item_data)

        return instance
