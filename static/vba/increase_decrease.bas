Attribute VB_Name = "Module1"
Sub Macro1()
Attribute Macro1.VB_ProcData.VB_Invoke_Func = "I\n14"
'
' Macro1 Macro
'
' Keyboard Shortcut: Ctrl+Shift+I
'
    ActiveCell.FormulaR1C1 = "=R[-1]C/0.99"
    ActiveCell.Offset(1, 0).Range("A1").Select
End Sub
Sub Macro2()
Attribute Macro2.VB_ProcData.VB_Invoke_Func = "D\n14"
'
' Macro2 Macro
'
' Keyboard Shortcut: Ctrl+Shift+D
'
    ActiveCell.FormulaR1C1 = "=R[1]C*0.9"
    ActiveCell.Offset(-1, 0).Range("A1").Select
End Sub
