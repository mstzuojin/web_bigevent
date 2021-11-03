$(() => {
    // 点击'去reg账号'的链接
    $('#link_reg').on('click', () => {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击'去login账号'的链接
    $('#link_login').on('click', () => {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从Layui 中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify() 函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: (value) => {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return '两次密码不一致,请确认'
        }
    });

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', (e) => {
        e.preventDefault()
        var data = {
            username: $('#form_reg[name = username]').val(),
            password: $('#form_reg[name = password]').val()
        }
        $.post('/api/reguser', data, (res) => {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功!')
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit((e) => {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('登入失败!')
                layer.msg('登入成功!')
                    // 将登入成功得到的token字符串,保存到localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台页面
                location.href = './index.html'
            }
        })
    })
})